<template>
  <el-pagination
    v-bind="paginationProps"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>
<script>
import paginationMixin from "./mixins/paginationMixin";

export default {
  name: "HyPagination",
  mixins: [paginationMixin],
  computed: {
    paginationProps() {
      return {
        background: true,
        ...this.$attrs,
        layout: this.layout,
        currentPage: this.current,
        pageSize: this.pageSize,
      };
    },
  },
};
</script>
