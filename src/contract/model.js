export default {
  namespace: 'contract',
  state: () => {
    return {
      count: 1
    };
  },
  mutations: {
    updateState(state, { payload }) {
      console.log(state, payload);
      return {
        ...state,
        ...payload
      }
    }
  },
  effects: {
    *test(_, { put }) {
      console.log('put');
      yield put({ 
        type: 'changeState', 
        payload: {
        count: 2
      }});
      // yield put({ type: 'putTest'});
    }
  }
}
