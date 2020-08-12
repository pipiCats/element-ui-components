/**
 * @description 处理表格多选，支持跨页多选
 */
const SELECT_FLAG = Symbol.for("ROW_SELECTED");

export default {
  data() {
    return {
      // 已经选中的row
      selecedRows: [],
      // 当前表格实例
      $table: null,
      // __rowKey，根据此关键字过滤判断选中状态
      __rowKey: null,
    };
  },
  watch: {
    selecedRows: {
      immediate: true,
      handler(rows) {
        this.$emit("selected-rows-change", rows);
      },
    },
  },
  methods: {
    __clearSelection() {
      this.selecedRows = [];
      this.__rowsKeyMap = {};
      this.$table.clearSelection();
      // 重置当前列表数据的选中状态
      this.$table.data.forEach((row) => {
        row[SELECT_FLAG] = false;
      });
    },
    __setMuiltSelectOptions(options) {
      const { tableRef, rowKey } = options;
      this.$table = tableRef;
      this.__rowKey = rowKey;
      // 监听表格数据变化
      this.$watch(
        "$table.data",
        (data) => {
          if (data.length) {
            data.forEach((row) => {
              if (this.__rowsKeyMap[row[this.__rowKey]]) {
                // 调用组件实例方法设置表格选中状态
                this.$table.toggleRowSelection(row, true);
              }
            });
          }
        },
        { immediate: true }
      );
    },
    // 单选
    __onSelect(selection, row) {
      if (this.__rowsKeyMap[row[this.__rowKey]] || row[SELECT_FLAG]) {
        // 已被选中, 则取消选中
        row[SELECT_FLAG] = false;
        this.selecedRows = this.selecedRows.filter(
          (selectedRow) => selectedRow[this.__rowKey] !== row[this.__rowKey]
        );
        // 删除对应的key
        delete this.__rowsKeyMap[row[this.__rowKey]];
      } else {
        row[SELECT_FLAG] = true;
        // 保存对应的key
        this.__rowsKeyMap[row[this.__rowKey]] = true;
        this.selecedRows.push(row);
      }
    },
    __onSelectAll(selection) {
      const { data } = this.$table;
      // 取消全选操作
      if (selection.length === 0) {
        const rowKeys = {};
        data.forEach((item) => {
          const rowKey = item[this.__rowKey];
          item[SELECT_FLAG] = false;
          rowKeys[rowKey] = true;
        });
        this.selecedRows = this.selecedRows.filter((selectedRow) => {
          const rowKey = selectedRow[this.__rowKey];
          const isIncludeKey = rowKeys[rowKey];
          if (isIncludeKey) {
            // 删除对应的key
            delete this.__rowsKeyMap[rowKey];
          }

          return !isIncludeKey;
        });
      } else {
        const rows = [];
        selection.forEach((row) => {
          if (!row[SELECT_FLAG]) {
            rows.push(row);
            row[SELECT_FLAG] = true;
            // 存储key
            this.__rowsKeyMap[row[this.__rowKey]] = true;
          }
        });
        this.selecedRows = this.selecedRows.concat(rows);
      }
    },
  },
  created() {
    // row key map
    this.__rowsKeyMap = {};
  },
};
