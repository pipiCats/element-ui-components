<template>
  <div id="app">
    <el-row>
      <el-row>
        <hy-form v-model="form" v-bind="formProps">
          <template slot="orderNo-label" slot-scope="{ label }">
            {{ label }}
          </template>
          <template slot="orderNo" slot-scope="props">
            <el-input
              v-bind="props"
              v-model="form.orderNo"
              @click.native="handleClick"
            />
          </template>
        </hy-form>
      </el-row>
      <el-row>
        <el-button type="primary" @click="onQuery">
          查询
        </el-button>
        <el-button  @click="onReset">
          重置
        </el-button>
      </el-row>
    </el-row>
    <el-row>
      <hy-table v-bind="tableProps">
        <template slot="expand" slot-scope="{ row }">
          {{ row.code }}
        </template>
      </hy-table>
    </el-row>
  </div>
</template>

<script>
import { HyForm, HyTable } from "./components";
import { searchFields, tableFields } from "./fields";
import searchPageMixin from "./mixins/searchPageMixin";

const fieldCol = {
  xl: 6,
  lg: 8,
  md: 8,
  sm: 12,
};

export default {
  name: "App",
  mixins: [searchPageMixin],
  data() {
    return {
      form: {
        name: 222
      },
      inputValue: "",
    };
  },
  computed: {
    formProps() {
      return {
        fieldCol,
        fields: searchFields,
        nextFields: [
          {
            key: "age",
            name: "年龄1",
          },
          {
            key: "orderNo",
          },
        ],
      };
    },
    tableProps() {
      return {
        fields: tableFields,
        border: true,
        data: [
          {
            code: "CP-20200727-27424",
            name: "重量区间计费",
            updateTime: 1595850116268,
          },
          {
            code: "CP-20200727-27423",
            name: "交叉条件测试",
            updateTime: 1595828820568,
          },
        ],
        nextFields: [
          {
            key: "name",
            render: (value) => `${value}-'---'`,
          },
          {
            key: "updateTime",
            name: "更新时间",
            type: "datetime",
          },
        ],
        ...this.nextTableProps,
        pageSizeKey: 'size',
        currentKey: 'page'
      };
    },
  },
  methods: {
    onSearch(param) {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("param", param);
          resolve();
        }, 500);
      });
    },
    handleClick() {
      console.log("---");
    },
  },
  components: {
    HyForm,
    HyTable,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
