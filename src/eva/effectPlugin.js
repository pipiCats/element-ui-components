export default function effectPlugin(effect, sageEffects, model) {
  const { namespace } = model;
  console.log('namespace', namespace);

  return function* (action) {
    console.log('action', action)
    return yield effect(action, sageEffects);
  }
}