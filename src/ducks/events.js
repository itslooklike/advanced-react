import firebase from 'firebase';
import { Record, OrderedMap, OrderedSet } from 'immutable';
import { put, all, call, takeEvery, spawn, fork, cancel } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { createSelector } from 'reselect';

import { fbDataToEntities } from './utils';
import { appName } from '../config';

export const moduleName = 'events';

// Actions
export const EVENTS_FETCH_REQUEST = `${appName}/${moduleName}/EVENTS_FETCH_REQUEST`;
export const EVENTS_FETCH_SUCCESS = `${appName}/${moduleName}/EVENTS_FETCH_SUCCESS`;
export const EVENTS_FETCH_ERROR = `${appName}/${moduleName}/EVENTS_FETCH_ERROR`;

export const SELECT_EVENT = `${appName}/${moduleName}/SELECT_EVENT`;

// Reducer
const ReducerState = Record({
  entities: new OrderedMap({}),
  selected: new OrderedSet([]),
  loading: false,
  error: null,
});

const EventRecord = Record({
  month: null,
  submissionDeadLine: null,
  title: null,
  url: null,
  when: null,
  where: null,
  uid: null,
});

export default function reducer(state = new ReducerState(), action) {
  const { type, payload, error } = action;

  switch (type) {
    case EVENTS_FETCH_REQUEST:
      return state.set('loading', true).set('error', null);
    case EVENTS_FETCH_SUCCESS:
      return state.set('loading', false).set('entities', fbDataToEntities(payload, EventRecord));
    case EVENTS_FETCH_ERROR:
      return state.set('loading', false).set('error', error);

    case SELECT_EVENT:
      return state.selected.contains(payload.uid)
        ? state.update('selected', (selected) => selected.remove(payload.uid))
        : state.update('selected', (selected) => selected.add(payload.uid));

    default:
      return state;
  }
}

// Selector
export const stateSelector = (state) => state[moduleName];
export const entitiesSelector = createSelector(stateSelector, (state) => state.entities);
export const eventsListSelector = createSelector(entitiesSelector, (entities) =>
  entities.valueSeq().toArray()
);

// Actions Creator
export function eventsFetch() {
  return {
    type: EVENTS_FETCH_REQUEST,
  };
}

export function selectEvent(uid) {
  return {
    type: SELECT_EVENT,
    payload: { uid },
  };
}

// Sagas
export const eventsFetchSaga = function*() {
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
};

export const bgSyncSaga = function*() {
  try {
    while (true) {
      yield delay(2 * 1000);
      yield call(eventsFetchSaga);
    }
  } finally {
    console.log('👋');
  }
};

export const cancelBgSaga = function*() {
  const task = yield fork(bgSyncSaga);
  yield delay(5 * 1000);
  yield cancel(task);
};

export const saga = function*() {
  yield spawn(cancelBgSaga);
  yield all([takeEvery(EVENTS_FETCH_REQUEST, eventsFetchSaga)]);
};
