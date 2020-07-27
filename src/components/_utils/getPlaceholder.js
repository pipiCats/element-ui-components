import { rules } from '../form/constants';

export default function getPlaceholder(name, type) {
  let placeholder;
  const rulesKeys = Object.keys(rules);
  for (let i = 0; i < rulesKeys.length; i += 1) {
    const rulesKey = rulesKeys[i];
    const regExp = new RegExp(rulesKey);
    if (regExp.test(type)) {
      const rule = rules[rulesKey];
      placeholder = typeof rule === 'string' ? `${rule}${name}` : rule;
      break;
    }
  }

  if (!placeholder) {
    placeholder = `请输入${name}`;
  }

  return placeholder;
}
