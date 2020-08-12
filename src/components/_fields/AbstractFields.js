import warning from "../_utils/warning";
import isPlainObject from "../_utils/isPlainObject";

class AbstractFields {
  constructor(fields = []) {
    this.fieldKeyMap = {};
    this.fields = this.createFields(Object.freeze(fields));
    this.originalFieldsLength = this.fields.legnth;
    this.rebuildField = this.rebuildField.bind(this);
  }

  createFields(fields) {
    // check fields
    this.checkFields(fields);

    return fields.map((field, index) => {
      const { key } = field;
      this.fieldKeyMap[key] = index;
      return this.rebuildField(field, index);
    });
  }

  combineNextFields(nextFields) {
    if (!nextFields) return this.fields;
    // check nextFields
    this.checkFields(nextFields);

    if (nextFields.length === 0) return this.fields;

    if (this.fields.length > this.originalFieldsLength) {
      this.fields = this.fields.slice(0, this.originalFieldsLength);
    }

    nextFields.forEach((nextField) => {
      const { key } = nextField;
      const position = this.fieldKeyMap[key];
      if (typeof position !== "undefined") {
        const mergedField = this.mergeField(this.fields[position], nextField);
        this.fields[position] = this.rebuildField(mergedField, position);
      } else {
        const length = this.fields.length;
        this.fieldKeyMap[key] = length;
        this.fields.push(this.rebuildField(nextField, length));
      }
    });

    return this.fields;
  }

  mergeField(field = {}, nextField) {
    return Object.keys(nextField).reduce(
      (next, key) => {
        if (isPlainObject(field[key]) && isPlainObject(nextField[key])) {
          next[key] = {
            ...field[key],
            ...nextField[key],
          };
        } else {
          next[key] = nextField[key];
        }
        return next;
      },
      { ...field }
    );
  }

  checkFields(fields) {
    warning(Array.isArray(fields), "fields must be array");
  }
}

export default AbstractFields;
