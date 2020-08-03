export default {
  namespace: "product",
  state: {
    count: 1,
  },
  mutations: {
    changeState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *test(_, { select, update }) {
      const { count } = yield select();
      yield update({ count: count + 1 });
    },
  },
};
