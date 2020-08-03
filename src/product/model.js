export default {
  namespace: "product",
  state: {
    count: 1,
  },
  mutations: {
    changeState(state, { payload }) {
    return {
      ...state,
      ...payload
    };
    },
  },
  effects: {
    *test(_, { put, select }) {
      const { count } = yield select(state => state.product);
      yield put({
        type: "changeState",
        payload: {
          count: count + 1
        }
      });
    },
  },
};
