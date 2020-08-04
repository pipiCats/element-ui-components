<template>
  <el-form :model="form" v-bind="formProps">
    <hy-form-item
      v-for="{ key, ...field } of dealedFields"
      :key="key"
      :field="field"
      :form="form"
    >
      <template :slot="`${key}-label`" slot-scope="props">
        <slot :name="`${key}-label`" v-bind="props" />
      </template>
      <template :slot="key" slot-scope="props">
        <slot :name="key" v-bind="props" />
      </template>
    </hy-form-item>
  </el-form>
</template>

<script>
import HyFormItem from "./FormItem";
import FormFields from "./formFields";

export default {
  name: "Form",
  provide() {
    return this.provide;
  },
  data() {
    return {
      form: {},
    };
  },
  props: {
    size: {
      type: String,
      default: "small",
    },
    value: {
      type: Object,
      default: () => {},
    },
    fields: {
      required: true,
      type: Array,
      default: () => [],
    },
    nextFields: {
      type: Array,
      default: () => [],
    },
    fieldCol: {
      type: Object,
      default: () => {},
    },
    labelWidth: {
      type: [Number, String],
      default: 80,
    },
    wrapperWidth: {
      type: [Number, String],
      default: 300,
    },
    labelAlign: {
      type: String,
      default: "right",
    },
    colon: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    HyFormItem,
  },
  computed: {
    formProps() {
      return {
        size: this.size,
        ...this.$attrs,
      };
    },
    dealedFields() {
      console.log(this.formFields.combineNextFields(
        this.nextFields
      ));
      
      return this.formFields.combineNextFields(
        this.nextFields
      );
    },
    provide() {
      const { labelAlign, fieldCol, labelWidth, wrapperWidth, colon } = this;
      return {
        fieldCol,
        labelAlign,
        labelWidth,
        wrapperWidth,
        colon,
      };
    },
  },
  watch: {
    form: {
      immediate: true,
      deep: true,
      handler(value) {
        this.$emit("input", value);
      },
    },
    value(newValue) {
      this.form = newValue;
    },
  },
  created() {
    this.formFields = new FormFields(this.fields);
    this.form = this.value || {};
  },
};
</script>
