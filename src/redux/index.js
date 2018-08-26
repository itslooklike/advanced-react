import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import history from '../history';
import reducer from './reducer';

const enhancer = applyMiddleware(
  routerMiddleware(history),
  thunk,
  createLogger({ collapsed: true })
);

const store = createStore(reducer, composeWithDevTools(enhancer));

export default store;
