import omit from "omit.js";
import AbstractFields from "../_fields/AbstractFields";
import warning from "../_utils/warning";
import getPlaceholder from "../_utils/getPlaceholder";

class FormFields extends AbstractFields {
  rebuildField(field) {
    let placeholder;
    let enchanceRules;
    const {
      key,
      name,
      type = "input",
      attrs = {},
      required,
      message,
      rules = [],
    } = field;
    // check key
    warning(!!key, "key must be required");
    if (
      name &&
      typeof name === "string" &&
      typeof attrs.placeholder !== 'undefined'
    ) {
      placeholder = getPlaceholder(name, type);
    }
    if (required) {
      const existRequiredRule = rules.some((rule) =>
        hasOwnProperty.call(rule, "required")
      );
      enchanceRules = existRequiredRule
        ? rules
        : [
            {
              required: true,
              message: message || placeholder,
            },
            ...rules,
          ];
    }

    return {
      ...omit(field, ["name", "required", "message"]),
      attrs: {
        ...attrs,
        placeholder,
      },
      label: name,
      prop: key,
      rules: enchanceRules,
    };
  }
}

export default FormFields;
