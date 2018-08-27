import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import history from '../history';
import reducer from './reducer';
import { saga } from '../ducks/people';

const sagaMiddleware = createSagaMiddleware();

const enhancer = applyMiddleware(
  sagaMiddleware,
  routerMiddleware(history),
  thunk,
  createLogger({ collapsed: true })
);

const store = createStore(reducer, composeWithDevTools(enhancer));

sagaMiddleware.run(saga);

export default store;
