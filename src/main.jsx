import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes/index.jsx';
import configureStore from './store/settings/configureStore.jsx';

if (typeof window != 'undefined' && window.document) require('./main.scss');

const preloadedState = window.__PRELOADED_STATE__;
const store = configureStore(preloadedState);
delete window.__PRELOADED_STATE__;

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>,
  document.getElementById('wrapper')
);