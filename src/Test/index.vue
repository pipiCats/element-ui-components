<template>
  <el-main>
    <el-row>
      <el-row>
        <yl-form v-model="form" v-bind="formProps" />
      </el-row>
      <el-row :style="{ margin: '20px 0' }" type="flex" justify="end">
        <el-button type="primary" size="small" @click="onQuery">查询</el-button>
        <el-button size="small" @click="onReset">重置</el-button>
        <el-button size="small" @click="clearAllSelection">清除多选</el-button>
      </el-row>
    </el-row>
    <el-row>
      <yl-table @select="onSelect" @select-all="onSelectAll" ref="ylTable" v-bind="tableProps">
        <template slot="body(action)" slot-scope="{row}">
          <span>
            <el-button type="text" @click="clearRow(row)">启用</el-button>
          </span>
        </template>
      </yl-table>
    </el-row>
  </el-main>
</template>
<script>
import YlForm from "@thales/form";
import YlTable from "@thales/table";
import searchPageMixin from "@thales/search-page";
import crossPageMuiltSelectMixin from "./crossPageMuiltSelectMixin";
import { searchFields, tableFields } from "./fields";

export default {
  mixins: [searchPageMixin, crossPageMuiltSelectMixin],
  provide() {
    return {
      thales: {
        "yl-table": {
          pageSizeKey: "size",
          currentKey: "page",
          fieldType: {
            test: () => "test",
          },
        },
      },
    };
  },
  components: {
    YlForm,
    YlTable,
  },
  data() {
    return {
      form: {
        productName: "标准产品",
      },
    };
  },
  computed: {
    formProps() {
      return {
        fields: searchFields,
      };
    },
    tableProps() {
      return {
        border: true,
        data: this.data,
        fields: tableFields,
        nextFields: [
          {
            key: "productType",
            name: "productType",
          },
          {
            key: "productType1",
            name: "产品类型",
            type: "test",
          },
          {
            key: 'action',
            name: '操作'
          }
        ],
        total: 50,
        ...this.mixinTableProps,
      };
    },
  },
  methods: {
    onSearch(param) {
      const { page } = param;
      // 模拟api请求
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const data = Array.from({ length: 5 }, (_, index) => {
            return {
              code: `DF-page-${page}-${index}`,
              productName: `产品名称-${index}`,
            };
          });
          this.data = data;
          reject();
        }, 1000);
      });
    },
  },
  mounted() {
    this.setMuiltSelectOptions({
      tableRef: this.$refs.ylTable.$children[0].$table,
      rowKey: "code",
    });
    this.$on("selection-change", (v) => {
      console.log("v", v);
    });
  },
};
</script>
