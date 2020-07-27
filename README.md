### HopeForm

可通过fields配置生成form表单。表单的类型可分为默认内置的input、select、number等基础类型以及外部自定义组件类型。支持slot自定义渲染对应key的组件。

no be be, show me your code

#### fields配置

```
export default [{
  key: 'age',
  name: '年龄',
  type: 'input',
  required: true,
}, {
  key: 'name',
  name: '姓名',
  type: 'number',
  required: true,
  nativeOn: {
    click() {
      console.log(1);
    }
  }
}, {
  key: 'orderNo',
  name: '序号'
}];

```
| 参数        | 说明                   | 类型          | 默认值 |
| ----------- | ---------------------- | ------------- | ------ |
| key | 绑定组件唯一key               | string | -      |
| name  | 需要显示的label  | string        | -     |
| fieldCol  | 控制每行显示几个FormItem, 详细属性参见el-col  | object        | {}     |
| labelCol  | label区域布局, 详细属性参见el-col  | object        | {}    |
| wrapperCol  | 表单元素区域布局, 详细属性参见el-col  | object        | {}     |
| required  | 是否必填  | boolan        | false    |
| requiredMessage  | 必填时的校验信息，不传时默认使用placeholder  | string        | -    |

其他属性见 https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1

> 传入name的时候我们会匹配一些规则，自动生成placeholder。若你要搞怪想用自己的palceholder,那就自己传吧，拦不住。

> reqired用于快捷设置表单必填，我们会向rules数组中主动加入{ requred: true, message: xxx }的规则。message默认使用placeholder,否则使用requiredMessage。
若你主动传入的rules包含required: true的规则，则使用rules。

### nextFields

可以改变fields配置里面任何属性值（key除外）。  'class', 
  'style', 
  'attrs', 
  'props', 
  'domProps',
  'on', 
  'nativeOn',
  'directives',
  'scopedSlots',
  'slot',
  'key',
  'ref',
  'refInFor' 这些字段里面，若是对象，则采用浅拷贝，反之直接覆盖。

```
<template>
  <div id="app">
    <hope-form v-model="form" v-bind="formProps">
      <template slot="orderNo" slot-scope="props">
        <el-input v-model="form.orderNo" v-bind="props" @click.native="handleClick" />
      </template>
    </hope-form>
    {{ form }}
  </div>
</template>

<script>

import HopeForm from './components/HopeForm.vue';
import fields from './fields';

const fieldCol = { span: 8 };
const labelCol = { span: 6 };
const wrapperCol = { span: 16 };

export default {
  name: 'App',
  data() {
    return {
      form: {
        name: 2
      },
      inputValue: '',
      fields,
      nextFields: [{
         key: 'age',
         name: '年龄1',
      }, {
        key: 'orderNo',
        required: true,
      }]
    }
  },
  computed: {
    formProps() {
      return {
        fieldCol,
        labelCol,
        wrapperCol,
        fields,
        nextFields: this.nextFields
      }
    }
  },
  methods: {
    handleClick() {
      console.log('---');
    }
  },
  components: {
   HopeForm
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

```

### `寻找大佬优化`

-- 需要全局注入外部类型的组件类型

-- FieldInput实现优化

-- 提供渲染提交按钮的插槽

