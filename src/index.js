import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import axiosMiddleware from 'redux-axios-middleware';
import axiosInstance from './utils/ajax';
import axiosMiddleConfig from './utils/axiosMiddleConfig';
import reducerDict from './reducers';
import routes from './routes';

const middleware = [axiosMiddleware(axiosInstance, axiosMiddleConfig)];

const store = createStore(combineReducers(reducerDict), applyMiddleware(...middleware));

const rootDom = document.querySelector('#root');
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  rootDom,
);
