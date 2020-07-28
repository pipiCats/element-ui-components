import omit from "omit.js";
import AbstractFields from "../_fields/AbstractFields";
import isPlainObject from "../_utils/isPlainObject";
import warning from "../_utils/warning";

class TableFields extends AbstractFields {
  createDealedField = (field) => {
    const { key, name } = field;
    // check key
    warning(!!key, "key must be required");
  
    return {
      ...omit(field, ["name"]),
      prop: key,
      label: name,
    };
  };

  mergeField = (field = {}, nextField) => {
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
  };
}

export default TableFields;
