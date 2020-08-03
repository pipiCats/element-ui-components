import createSagaMiddleware from "redux-saga";
import applyMiddleware from "./applyMiddleware";
import prefixNamespace from "./prefixNamespace";
import createPromiseMiddleware from "./createPromiseMiddleware";
import createStore from "./createStore";
import checkModel from "./checkModel";
import checkStore from "./checkStore";
import getSaga from "./getSaga";

const defaultOnError = (error) => {
  throw error;
};

export default function start({
  store,
  models = [],
  onError = defaultOnError,
  onEffect =  []
}) {
  // 检查store对象
  checkStoreInstance(store);

  const existModels = [];

  const existEffects = {};

  const sagaMiddleware = createSagaMiddleware();

  const promiseMiddleware = createPromiseMiddleware(store);

  const middleware = applyMiddleware(promiseMiddleware, sagaMiddleware);

  const enchanceStore = createStore(store, middleware);

  // 批量处理model
  models.forEach(registerModel);

  function checkStoreInstance(store) {
    if (process.env.NODE_ENV !== "production") {
      checkStore(store);
    }
  }

  function processModelWithNamespace(model, existEffects) {
    // 默认启用vuex的namespaced
    return prefixNamespace({ ...model, namespaced: true }, existEffects);
  }

  // 注册model
  function registerModel(model) {
    if (process.env.NODE_ENV !== "production") {
      // check model
      checkModel(model, existModels);
    }
    const m = processModelWithNamespace(model, existEffects);

    existModels.push(m);

    const { effects, namespace } = m;

    if (effects) {
      sagaMiddleware.run(getSaga(effects, m, onError, onEffect, {}));
    }
    // vuex动态注入model
    if (!enchanceStore.hasModule(namespace)) {
      enchanceStore.registerModule(namespace, m);
    }

    enchanceStore._effects = existEffects;
  }

  enchanceStore.registerModel = registerModel;

  return enchanceStore;
}