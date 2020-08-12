/**
 * @description 处理表格多选，支持跨页多选
 */

export default {
  data() {
    return {
      // 已经选中的row
      selecedRows: [],
      // 当前表格实例
      $table: null,
      // __rowKey，根据此关键字过滤判断选中状态
      __rowKey: "id",
    };
  },
  watch: {
    selecedRows: {
      immediate: true,
      handler(rows) {
        this.$emit("selection-change", rows);
      },
    },
  },
  methods: {
    clearAllSelection() {
      this.selecedRows = [];
      this.__rowsKeyMap = {};
      this.$table.clearSelection();
    },
    clearRow(row = {}) {
      const isSelected = this.__getRowKey(row);
      if (isSelected) {
        this.$table.toggleRowSelection(row, false);
        this.selecedRows = this.selecedRows.filter(
          (selectedRow) => selectedRow[this.__rowKey] !== row[this.__rowKey]
        );
        this.__deleteRowKey(row);
      }
    },
    __getRowKey(row) {
      return this.__rowsKeyMap[row[this.__rowKey]];
    },
    __deleteRowKey(row) {
      delete this.__rowsKeyMap[row[this.__rowKey]];
    },
    __setRowKey(row) {
      this.__rowsKeyMap[row[this.__rowKey]] = true;
    },
    setMuiltSelectOptions(options) {
      const { tableRef, rowKey } = options;
      this.$table = tableRef;
      this.__rowKey = rowKey;
      // 监听表格数据变化
      this.$watch(
        "$table.data",
        (data) => {
          if (data.length) {
            data.forEach((row) => {
              if (this.__getRowKey(row)) {
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
    onSelect(_, row) {
      const isSelected = this.__getRowKey(row);
      if (isSelected) {
        // 已被选中, 则取消选中
        this.selecedRows = this.selecedRows.filter(
          (selectedRow) => selectedRow[this.__rowKey] !== row[this.__rowKey]
        );
        // 删除对应的key
        this.__deleteRowKey(row);
      } else {
        this.selecedRows.push(row);
        // 保存对应的key
        this.__setRowKey(row);
      }
    },
    onSelectAll(selection) {
      const { data } = this.$table;
      // 取消全选操作
      if (selection.length === 0) {
        const rowKeys = {};
        data.forEach((row) => {
          rowKeys[row[this.__rowKey]] = true;
        });
        this.selecedRows = this.selecedRows.filter((row) => {
          const rowKey = row[this.__rowKey];
          const isIncludeKey = rowKeys[rowKey];
          if (isIncludeKey) {
            this.__deleteRowKey(row);
          }
          return !isIncludeKey;
        });
      } else {
        const rows = [];
        selection.forEach((row) => {
          const isSelected = this.__getRowKey(row);
          if (!isSelected) {
            rows.push(row);
            this.__setRowKey(row);
          }
        });
        this.selecedRows = this.selecedRows.concat(rows);
      }
    },
  },
  created() {
    // 保存已选择的row key
    this.__rowsKeyMap = {};
  },
};
