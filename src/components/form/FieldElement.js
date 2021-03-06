import Vue from "vue";
import fieldTypes from "./fieldTypes";

Vue.component("yl-field-element", {
  props: ["value"],
  inheritAttrs: false,
  render(createElement) {
    const { globalFieldType, type, props, on, ...other } = this.$attrs;
    return createElement(
      fieldTypes[type] || globalFieldType[type],
      {
        props: {
          ...props,
          value: this.value,
        },
        on: {
          ...on,
          input: (value) => {
            this.$emit("input", value);
          },
        },
        ...other,
      },
      this.$slots.default
    );
  },
});
