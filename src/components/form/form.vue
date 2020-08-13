<template>
  <el-form ref="form" :model="form" v-bind="formProps">
    <yl-form-item
      v-for="{ key, ...field } of dealedFields"
      :key="key"
      :field="field"
      :form="form"
    >
      <template :slot="`label-${key}`" slot-scope="props">
        <slot :name="`label-${key}`" v-bind="props" />
      </template>
      <template :slot="key" slot-scope="props">
        <slot :name="key" v-bind="props" />
      </template>
    </yl-form-item>
  </el-form>
</template>

<script>
import YlFormItem from "./FormItem";
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
    labelSuffix: {
      type: String,
      default: ':',
    },
  },
  components: {
    YlFormItem,
  },
  computed: {
    $form() {
      return this.$refs.form;
    },
    formProps() {
      return {
        size: this.size,
        labelPosition: 'right',
        ...this.$attrs,
      };
    },
    dealedFields() {
      return this.formFields.combineNextFields(
        this.nextFields
      );
    },
    provide() {
      const { fieldCol, labelWidth, wrapperWidth } = this;
      return {
        fieldCol,
        labelWidth,
        wrapperWidth,
        labelSuffix: this.labelSuffix
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
  mounted() {
    this.$emit('forward-ref', '$form', this.$form);
  }
};
</script>
