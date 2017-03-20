import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { app } from '../index';

const configureStore = (preloadedState) => {
  const middlewares = [thunk];
  middlewares.push(createLogger());

  return createStore(
    app,
    preloadedState,
    applyMiddleware(...middlewares)
  );
};

export default configureStore;