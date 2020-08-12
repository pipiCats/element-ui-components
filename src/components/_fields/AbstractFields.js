import warning from "../_utils/warning";
import isPlainObject from "../_utils/isPlainObject";

class AbstractFields {
  constructor(fields = []) {
    this.fieldKeyMap = {};
    this.fields = Object.freeze(fields);
    this.finalFields = this.createFields(this.fields);
    // this.rebuildField = this.rebuildField.bind(this);
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
    if (!nextFields) return this.finalFields;
    // check nextFields
    this.checkFields(nextFields);

    if (!nextFields.length) return this.finalFields;

    nextFields.forEach((nextField) => {
      const { key } = nextField;
      const position = this.fieldKeyMap[key];
      if (typeof position !== "undefined") {
        const mergedField = this.mergeField(this.fields[position], nextField);
        this.finalFields[position] = this.rebuildField(mergedField, position);
      } else {
        const length = this.finalFields.length;
        this.fieldKeyMap[key] = length;
        this.finalFields.push(this.rebuildField(nextField, length));
      }
    });

    return this.finalFields;
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
    warning(
      Array.isArray(fields),
      `the fields should be array, but got ${typeof fields}`
    );
  }
}

export default AbstractFields;
