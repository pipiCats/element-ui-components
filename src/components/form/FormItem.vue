<template>
  <el-col v-bind="colProps">
    <el-form-item v-bind="formItemProps" :class="formItemClass">
      <template slot="label">
        <slot :name="`${key}-label`" v-bind="{ label }">
          {{ label }}
        </slot>
      </template>
      <div :style="{ width: wrapperWidthProp }">
        <slot :name="key" v-bind="slotScope">
          <field-element v-model="form[key]" v-bind="inputProps" />
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
  name: "HyFormItem",
  inject: [
    "labelAlign",
    "fieldCol",
    "labelWidth",
    "wrapperWidth",
    "colon",
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
        globalFieldType:  this.globalFieldType || {}
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
        "furion-form-item-colon": this.colonProp,
        [`furion-form-item-label-${this.labelAlign}`]: true,
      };
    },
  },
};
</script>

<style lang="css">
.furion-form-item-colon .el-form-item__label:after {
  content: ":";
  color: #333;
}

.furion-form-item-label-left .el-form-item__label {
  text-align: left;
}

.furion-form-item-label-center .el-form-item__label {
  text-align: center;
}

.furion-form-item-label-right .el-form-item__label {
  text-align: right;
}
</style>
