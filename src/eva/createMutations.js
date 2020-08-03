import Vue from "vue";
import isPlainObject from "./isPlainObject";
import { UPDATE_MUTATION } from "./constants";

export default function createMutations(mutations) {
  // 注入默认的mutation
  const enchanceMutations = {
    ...mutations,
    [UPDATE_MUTATION](state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  };

  return Object.keys(enchanceMutations).reduce((next, key) => {
    next[key] = (state, ...args) => {
      const mutationState = enchanceMutations[key].call(null, state, ...args);
      if (isPlainObject(mutationState)) {
        Object.keys(mutationState).forEach((key) => {
          Vue.set(state, key, mutationState[key]);
        });
      }
    };
    return next;
  }, {});
}
