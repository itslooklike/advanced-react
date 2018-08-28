import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import history from '../history';
import reducer from './reducer';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

const enhancer = applyMiddleware(
  sagaMiddleware,
  routerMiddleware(history),
  createLogger({ collapsed: true })
);

const store = createStore(reducer, composeWithDevTools(enhancer));

sagaMiddleware.run(rootSaga);

export default store;
