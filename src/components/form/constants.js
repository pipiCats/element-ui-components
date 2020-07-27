export const rules = {
  'input|input$': '请输入',
  number: '请输入',
  'select|select$': '请选择',
  'checkbox|radio': '请选择',
};

export const ElemetPropsKeys = [
  'class', 
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
  'refInFor',
];

export const ElemetProps = ElemetPropsKeys.reduce((next, key) => {
  next[key] = key;
  return next;
}, {});