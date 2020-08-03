import compose from './compose';

export default function(...middlewares) {
  return (createStore) => (...args) => {
    const store = createStore(...args);
    const getState = () => store.state;

    let dispatch;
    const middlewareAPI = {
      getState: getState,
      dispatch: (action, ...args) => dispatch(action, ...args),
    };
    const chain = middlewares.map((middleware) => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);

    store.dispatch = dispatch;

    return store;
  };
}
