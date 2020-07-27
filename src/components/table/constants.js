export const tableColumnTypes = ['selection', 'index', 'expand'].reduce((pre, key) => {
  pre[key] = key;
  return pre;
}, {});