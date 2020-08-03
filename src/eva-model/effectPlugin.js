import { NAMESPACE_SEP, UPDATE_MUTATION } from "./constants";

function isActionType(actionType) {
  return actionType && actionType.indexOf(NAMESPACE_SEP) > -1;
}

function dealActionType(type, namespace) {
  return isActionType(type) ? type : `${namespace}${NAMESPACE_SEP}${type}`;
}

function getPayloadType(payload) {
  const type = typeof payload;
  if (type !== "object") return type;
  if (Array.isArray(payload) && payload.length) return "array";
  if (typeof payload === "function") return "function";
  return "unknown";
}

function createSelectEffect({ select }, namespace) {
  return function*(payload) {
    let result;
    const payloadType = getPayloadType(payload);
    const state = yield select();
    switch (payloadType) {
      case "undefined":
        result = state[namespace];
        break;
      case "string":
        result = state[payload];
        break;
      case "array":
        result = payload.reduce((pre, key) => {
          pre[key] = state[key];
          return pre;
        }, {});
        break;
      case "function":
        result = payload(state);
        break;
      default:
        result = {};
        break;
    }
    return result;
  };
}

function createPutEffect({ put, putResolve }, namespace) {
  // 兼容不同的版本的put.resolve
  const resolve = put.resolve || putResolve;
  function* putEffect({ type, payload }) {
    return yield resolve({
      type: dealActionType(type, namespace),
      payload,
    });
  }

  function* putSyncEffect({ type, payload }) {
    return yield put({
      type: dealActionType(type, namespace),
      payload,
    });
  }

  putEffect.sync = putSyncEffect;

  return putEffect;
}

function createUpdateEffect({ put }, namespace) {
  return function*(payload) {
    yield put({
      type: `${namespace}${NAMESPACE_SEP}${UPDATE_MUTATION}`,
      payload,
    });
  };
}

export default function effectPlugin(effect, sageEffects, model) {
  const { namespace } = model;
  
  return function*(action) {
    return yield effect(action, {
      ...sageEffects,
      select: createSelectEffect(sageEffects, namespace),
      put: createPutEffect(sageEffects, namespace),
      update: createUpdateEffect(sageEffects, namespace),
    });
  };
}
