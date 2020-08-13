<template>
  <div id="app">
    <el-row>
      <el-row>
        <hy-form ref="hyForm" v-model="form" v-bind="formProps">
          <template slot="label-orderNo" slot-scope="{ label }">
            <span>{{ label }}---</span>
          </template>
          <template slot="orderNo" slot-scope="props">
            {{ props.label }}
          </template>
        </hy-form>
      </el-row>
      <el-row>
        <el-button type="primary" @click="handleClick">
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

    <span>state: {{ state }}</span>
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
  provide() {
    return {
      globalRenderType: {
        test: value => `${value}-test`
      },
      thales: {
        'hy-form': {
          labelWidth: 200
        }
      }
    }
  },
  data() {
    return {
      form: {
        name: 222,
      },
      inputValue: "",
    };
  },
  computed: {
    state() {
      console.log(this.$store.state);
      return this.$store.state
    },
    formProps() {
      return {
        fieldCol,
                  labelWidth: 300,

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
            type: 'test',
            t: {
              name: 1
            }
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
      this.$store.dispatch({
        type: 'product/test',
        payload: { count: 2 }
      });
    }
  },
  components: {
    HyForm,
    HyTable,
  },
  mounted() {
    console.log(this.$refs.hyForm.$form)
  }
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
