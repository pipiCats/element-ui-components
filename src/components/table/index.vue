<template>
  <el-table v-bind="$attrs">
    <el-table-column
      v-for="{ key, ...field } in dealedFields"
      :key="key"
      v-bind="field"
    >
      <template slot-scope="scope" v-if="!field.type">
        <slot :name="key" v-bind="scope">
            {{ scope.row[key] }}
        </slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import TableFields from "./tableFields";

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
  },
  created() {
    this.tableFields = new TableFields();
  },
};
</script>
