import warning from "../_utils/warning";

class AbstractFields {
  fields = undefined;
  dealedFields = [];
  keyMap = {};

  dealFields = (fields) => {
    // check field
    this.checkFields(fields);
    const dealedFields = fields.map((field, index) => {
      const { key } = field;
      this.keyMap[key] = index;
      return this.createDealedField(field, index, "field");
    });
    this.fields = fields;
    this.dealedFields = dealedFields;
  };

  combineWithNextFields = (fields, nextFields, isFieldEffect) => {
    if (!this.fields || isFieldEffect) {
      this.dealFields(fields);
    }
    // check nextFields
    if (nextFields) {
      this.checkFields(nextFields);
    }
    // some condition just return
    if (!nextFields || !nextFields.length) {
      return this.dealedFields;
    }
    const { keyMap, mergeField, createDealedField, dealedFields } = this;
    // merge fields with nextFields
    nextFields.forEach((nextField) => {
      const { key } = nextField;
      const position = keyMap[key];
      if (typeof position !== "undefined") {
        const mergedField = mergeField(this.fields[position], nextField);
        this.dealedFields[position] = createDealedField(
          mergedField,
          position,
          "nextField"
        );
      } else {
        this.dealedFields.push(
          createDealedField(nextField, dealedFields.length, "nextField")
        );
      }
    });

    this.dealedFields = [...this.dealedFields];
    return this.dealedFields;
  };

  checkFields = (fields) => {
    warning(Array.isArray(fields), "fields must be array");
  };
}

export default AbstractFields;
