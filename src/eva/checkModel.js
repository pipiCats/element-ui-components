
import isPainObject from './isPlainObject';
import warning from './warning';

export default function checkModel(model, existModels) {
  const { namespace, effects } = model;

  warning(namespace, `namespace should be defined`);

  warning(
    typeof namespace === 'string',
    `namespace should be string, but got ${typeof namespace}`,
  );
  
  warning(
    !existModels.some(model => model.namespace === namespace),
    'namespace should be unique'
  );

  // effects
  if (effects) {
   warning(isPainObject(effects), `actions should be plain object, but got ${typeof effects}`)
  }
}
