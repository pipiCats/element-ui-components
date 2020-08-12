import AbstractFields from "../_fields/AbstractFields";
import warning from "../_utils/warning";
import getPlaceholder from "../_utils/getPlaceholder";

const DEFAULT_INPUT_TYPE = "input";

class FormFields extends AbstractFields {
  getInputPlaceholder(type, name, attrs) {
    let placeholder;
    if (typeof name === "string" && typeof attrs.placeholder === "undefined") {
      placeholder = getPlaceholder(name, type);
    }

    return placeholder;
  }

  getValidateRules(required, rules, message) {
    let validateRules = [];
    if (required) {
      const existRequiredRule = rules.some((rule) =>
        hasOwnProperty.call(rule, "required")
      );
      validateRules = existRequiredRule
        ? rules
        : [
            {
              required: true,
              message,
            },
            ...rules,
          ];
    }

    return validateRules;
  }

  rebuildField(field) {
    const {
      key,
      attrs = {},
      name,
      type = DEFAULT_INPUT_TYPE,
      required,
      message,
      ...other
    } = field;
    // check key
    warning(!!key, "key must be required");
    const placeholder = this.getInputPlaceholder(type, name, attrs);
    const rules = this.getValidateRules(
      required,
      rules,
      message || placeholder
    );

    return {
      ...other,
      rules,
      type,
      attrs: {
        ...attrs,
        placeholder,
      },
      label: name,
      prop: key,
    };
  }
}

export default FormFields;
