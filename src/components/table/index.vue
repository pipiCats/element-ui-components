<template>
  <el-table v-bind="$attrs">
    <el-table-column
      v-for="{ key, ...field } in columnFields"
      :key="key"
      v-bind="field"
    />
    <el-table-column
      v-for="{ key, ...field } in userFields"
      :key="key"
      v-bind="field"
    >
      <template slot-scope="scope">
        <slot :name="key" v-bind="scope">
          {{ scope.row[key] }}
        </slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import TableFields from "./tableFields";
import { tableColumnTypes } from "./constants";

export default {
  name: "HyTable",
  props: {
    fields: {
      required: true,
      type: Array,
      default: () => [],
    },
    nextFields: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    dealedFields() {
      return this.tableFields.combineWithNextFields(
        this.fields,
        this.nextFields
      );
    },
    columnFields() {
      return this.dealedFields.filter(({ type }) => tableColumnTypes[type]);
    },
    userFields() {
      return this.dealedFields.filter(({ type }) => !tableColumnTypes[type]);
    },
  },

  created() {
    this.tableFields = new TableFields();
  },
};
</script>
