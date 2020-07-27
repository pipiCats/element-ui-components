import omit from "omit.js";
import AbstractFields from "../_fields/AbstractFields";
import isPlainObject from "../_utils/isPlainObject";
import warning from "../_utils/warning";
import { tableColumnTypes } from "./constants";

class TableFields extends AbstractFields {
  createDealedField = (field) => {
    const { key, name, type } = field;
    // check key
    warning(!!key, "key must be required");
    // 过滤el-table-column存在的type
    const omitKeys =
      type && tableColumnTypes.indexOf(type) > -1 ? [] : ['type'];
    const renderTypeProp = omitKeys.length ? { renderType: type } : {};

    return {
      ...omit(field, ["name"].concat(omitKeys)),
      prop: key,
      label: name,
      ...renderTypeProp,
    };
  };

  mergeField = (field, nextField) => {
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
