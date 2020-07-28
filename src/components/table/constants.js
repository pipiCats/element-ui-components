export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const DATE_FORMAT = 'YYYY-MM-DD';

export const SELECTION_COLUMN = 'selection';

export const INDEX_COLUMN = 'index';

export const EXPAND_COLUMN = 'expand';

export const SPECIAL_TABLE_COLUMN = [SELECTION_COLUMN, INDEX_COLUMN].reduce((pre, key) => {
  pre[key] = key;
  return pre;
}, {});