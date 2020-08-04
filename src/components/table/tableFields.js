import omit from "omit.js";
import AbstractFields from "../_fields/AbstractFields";
import warning from "../_utils/warning";

class TableFields extends AbstractFields {
  rebuildField(field) {
    const { key, name } = field;
    // check key
    warning(!!key, "key must be required");
  
    return {
      ...omit(field, ["name"]),
      prop: key,
      label: name,
    };
  }
}

export default TableFields;
