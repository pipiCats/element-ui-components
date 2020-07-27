<template>
  <div id="app">
    <hy-form v-model="form" v-bind="formProps">
      <template slot="orderNo" slot-scope="props">
        <el-input v-model="form.orderNo" v-bind="props" @click.native="handleClick" />
      </template>
    </hy-form>
   <el-row>
    <hy-table v-bind="tableProps" />
   </el-row>
  </div>
</template>

<script>

import { HyForm, HyTable } from './components';
import { searchFields, tableFields } from './fields';

const fieldCol = { 
  xl: 6,
  lg: 8,
  md: 8,
  sm: 12
};

export default {
  name: 'App',
  data() {
    return {
      form: {
        name: 2
      },
      inputValue: '',
    }
  },
  computed: {
    formProps() {
      return {
        fieldCol,
        fields: searchFields,
        nextFields: [{
         key: 'age',
         name: '年龄1',
      }, {
        key: 'orderNo',
        required: true,
      }]
      }
    },
    tableProps() {
      return {
        fields: tableFields,
        border: true,
        data: [{
          code: 'CP-20200727-27424',
          name: '重量区间计费',
          updateTime: '1595850116268'
        }, {
          code: 'CP-20200727-27423',
          name: '交叉条件测试',
          updateTime: '1595835561017'
        }],
        nextFields: [{
          key: 'updateTime',
          name: '更新时间',
          type: 'datetime'
        }]
      };
    }
  },
  methods: {
    handleClick() {
      console.log('---');
    }
  },
  components: {
   HyForm,
   HyTable
  }
}
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
