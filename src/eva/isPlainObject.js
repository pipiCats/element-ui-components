export default function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;

  const { getPrototypeOf } = Object;
  let proto = obj;
  while (getPrototypeOf(proto) !== null) {
    proto = getPrototypeOf(proto);
  }
  return getPrototypeOf(obj) === proto;
}
