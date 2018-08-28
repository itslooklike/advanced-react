import firebase from 'firebase';
import { Record, OrderedMap } from 'immutable';
import { put, all, take, call } from 'redux-saga/effects';

import { appName } from '../config';

const ReducerState = Record({
  entities: new OrderedMap({}),
  loading: false,
  error: null,
});

export const moduleName = 'events';

export const EVENTS_FETCH_REQUEST = `${appName}/${moduleName}/EVENTS_FETCH_REQUEST`;
export const EVENTS_FETCH_SUCCESS = `${appName}/${moduleName}/EVENTS_FETCH_SUCCESS`;
export const EVENTS_FETCH_ERROR = `${appName}/${moduleName}/EVENTS_FETCH_ERROR`;

export default function reducer(state = new ReducerState(), action) {
  const { type, payload, error } = action;

  switch (type) {
    case EVENTS_FETCH_REQUEST:
      return state.set('loading', true).set('error', null);

    case EVENTS_FETCH_SUCCESS:
      return state.set('loading', false).set('entities', new OrderedMap(payload));

    case EVENTS_FETCH_ERROR:
      return state.set('loading', false).set('error', error);

    default:
      return state;
  }
}

export function eventsFetch() {
  return {
    type: EVENTS_FETCH_REQUEST,
  };
}

export const eventsFetchSaga = function*(action) {
  while (true) {
    yield take(EVENTS_FETCH_REQUEST);

    try {
      const ref = firebase.database().ref('events');
      const data = yield call([ref, ref.once], 'value');

      yield put({
        type: EVENTS_FETCH_SUCCESS,
        payload: data.val(),
      });
    } catch (error) {
      yield put({
        type: EVENTS_FETCH_ERROR,
        error,
      });
    }
  }
};

export const saga = function*() {
  yield all([eventsFetchSaga()]);
};
