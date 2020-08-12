import AbstractFields from "../_fields/AbstractFields";
import warning from "../_utils/warning";

class TableFields extends AbstractFields {
  rebuildField(field) {
    const { key, name, ...other } = field;
    // check key
    warning(!!key, "key must be required");
  
    return {
      ...other,
      prop: key,
      label: name,
    };
  }
}

export default TableFields;
