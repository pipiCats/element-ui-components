import Vue from "vue";
import isPlainObject from "./isPlainObject";

export default function createMutations(mutations) {
  return Object.keys(mutations).reduce((next, key) => {
    next[key] = (state, ...args) => {
      const mutationState = mutations[key].call(null, state, ...args);
      if (isPlainObject(mutationState)) {
        Object.keys(mutationState).forEach((key) => {
          Vue.set(state, key, mutationState[key]);
        });
      }
    };
    return next;
  }, {});
}
