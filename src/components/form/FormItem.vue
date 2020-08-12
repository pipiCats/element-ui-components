<template>
  <el-col v-bind="colProps">
        {{ key }}

    <el-form-item v-bind="formItemProps">
      <template slot="label">
        <slot :name="`label-${key}`" v-bind="{ label }">
          {{ label }}{{ labelSuffix }}
        </slot>
      </template>
      <div :style="{ width: wrapperWidthProp }">
        <slot :name="key" v-bind="slotScope">
          <yl-field-element v-model="form[key]" v-bind="inputProps" />
        </slot>
      </div>
    </el-form-item>
  </el-col>
</template>

<script>
import pick from "lodash.pick";
import omit from "omit.js";
import { ElemetPropsKeys } from "./constants";
import "./FieldElement";

export default {
  name: "YlFormItem",
  inject: [
    "fieldCol",
    "labelWidth",
    "wrapperWidth",
    "labelSuffix",
    "globalFieldType",
  ],
  props: {
    field: {
      type: Object,
      default: () => {},
    },
    form: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    key() {
      const { prop } = this.field;
      return prop;
    },
    label() {
      const { label } = this.field;
      return label;
    },
    slotScope() {
      const { attrs, props } = this.field;
      return {
        ...attrs,
        ...props,
      };
    },
    inputProps() {
      return {
        ...pick(this.field, ["type", ...ElemetPropsKeys]),
        globalFieldType: this.globalFieldType || {},
      };
    },
    colProps() {
      const { fieldCol } = this.field;
      return fieldCol || this.fieldCol;
    },
    formItemProps() {
      const { rules, ...restProps } = this.field;
      return {
        rules,
        ...omit(restProps || {}, ElemetPropsKeys),
        labelWidth: this.labelWidthProp,
      };
    },
    labelWidthProp() {
      const { labelWidth } = this.field;
      const value = labelWidth || this.labelWidth;
      return this.autoPrefixCssUnit(value);
    },
    wrapperWidthProp() {
      const { wrapperWidth } = this.field;
      const value = wrapperWidth || this.wrapperWidth;
      return this.autoPrefixCssUnit(value);
    },
  },
  methods: {
    autoPrefixCssUnit(value) {
      if (typeof value === "number") return `${value}px`;
      return value;
    },
  },
};
</script>
