import warning from "./warning";
import isPlainObject from "./isPlainObject";

export default function createStore(store, enhancer) {
  const { commit, _mutations } = store;
  const originalDispatch = store.dispatch;

  if (typeof enhancer !== "undefined") {
    if (typeof enhancer !== "function") {
      throw new Error("Expected the enhancer to be a function.");
    }

    return enhancer(createStore)(store);
  }

  function enchanceDispatch(action, ...args) {
    // action为字符串，我们认为您需要调用vuex原生的action
    if (typeof action === "string") {
      return originalDispatch(action, ...args);
    }
    // 调用saga action
    warning(
      isPlainObject(action),
      `action should be plain object, but got ${typeof action}`
    );
    const { type } = action;

    // 执行commit
    if (_mutations[type]) {
      commit(type, action);
    }

    return action;
  }
  store.dispatch = enchanceDispatch;

  return store;
}
