import { NAMESPACE_SEP } from './constants';

export default function prefixType(type, model) {
  const prefixedType = `${model.namespace}${NAMESPACE_SEP}${type}`;
  const typeWithoutAffix = prefixedType.replace(/\/@@[^/]+?$/, '');

  const mutation = model.mutations && model.mutations[type];
  const effect = model.effects && model.effects[typeWithoutAffix];

  if (mutation || effect) {
    return prefixedType;
  }
  return type;
}
