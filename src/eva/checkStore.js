import Vuex from "vuex";
import warning from "./warning";

export default function checkStore(store) {
  // 不为空
  warning(typeof store !== "undefined", "store must be required");
  // 必须为Vuex.store的实例
  warning(
    store instanceof Vuex.Store,
    "store must be an instance of Vuex.store"
  );
}
