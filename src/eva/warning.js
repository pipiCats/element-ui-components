import invariant from 'invariant';

/**
 * @description 显示警告信息
 * @param {boolean} condition 提示条件
 * @param {string} message 提示信息
 */
export default function warning(condition, message) {
  if (!condition) {
    invariant(condition, `[eva]: ${message}`);
  }
}
