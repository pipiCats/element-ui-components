export const searchFields = [{
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

export const tableFields = [{
  key: 'index',
  name: '序号',
  type: 'index',
}, {
  key: 'code',
  name: '产品编码',
}, {
  key: 'name',
  name: '产品名称'
}]