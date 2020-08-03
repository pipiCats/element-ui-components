import warning from 'warning';
import createMutations from './createMutations';
import { NAMESPACE_SEP, MODEL_EFFECTS } from './constants';

function prefix(obj, namespace, type, existEffects) {
  return Object.keys(obj).reduce((memo, key) => {
    warning(
      key.indexOf(`${namespace}${NAMESPACE_SEP}`) !== 0,
      `[prefixNamespace]: ${type} ${key} should not be prefixed with namespace ${namespace}`,
    );
    const newKey = `${namespace}${NAMESPACE_SEP}${key}`;
    memo[newKey] = obj[key];
    if (type === MODEL_EFFECTS) {
      existEffects[newKey] = obj[key];
    }
    return memo;
  }, {});
}

export default function prefixNamespace(model, existEffects) {
  const { namespace, effects, mutations } = model;

  if (effects) {
    model.effects = prefix(effects, namespace, MODEL_EFFECTS, existEffects);
  }

  if (mutations) {
    model.mutations = createMutations(mutations);
  }
  return model;
}
