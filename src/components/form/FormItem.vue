<template>
  <el-col v-bind="colProps">
    <el-form-item v-bind="formItemProps" :class="formItemClass">
      <div :style="{ width: wrapperWidthProp }">
        <slot :name="key" v-bind="slotScope">
          <field-element v-model="form[key]" v-bind="inputProps" />
        </slot>
      </div>
      <template></template>
    </el-form-item>
  </el-col>
</template>

<script>
import pick from "lodash.pick";
import omit from "omit.js";
import { ElemetPropsKeys } from "./constants";
import "./FieldElement";

export default {
  name: "HyFormItem",
  inject: ["labelAlign", "fieldCol", "labelWidth", "wrapperWidth", "colon"],
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
    slotScope() {
      const { attrs, props } = this.field;
      return {
        ...attrs,
        ...props,
      };
    },
    inputProps() {
      return pick(this.field, ["type", ...ElemetPropsKeys]);
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
      if (typeof value === "number") return `${value}px`;
      return value;
    },
    wrapperWidthProp() {
      const { wrapperWidth } = this.field;
      const value = wrapperWidth || this.wrapperWidth;
      if (typeof value === "number") return `${value}px`;
      return value;
    },
    colonProp() {
      const { colon } = this.field;
      return colon || this.colon;
    },
    formItemClass() {
      return {
        "hope-colon": this.colonProp,
      };
    },
  },
};
</script>

<style lang="css">
.hope-colon .el-form-item__label:after {
  content: ":";
  color: #333;
}
</style>
