import { Record, List } from 'immutable';
import { put, takeEvery, call } from 'redux-saga/effects';

import { appName } from '../config';
import { genId } from './utils';

const ReducerState = Record({
  entities: new List([]),
});

const PersonRecord = Record({
  id: null,
  firstName: null,
  lastName: null,
  email: null,
});

export const moduleName = 'people';
export const ADD_PERSON_REQUEST = `${appName}/${moduleName}/ADD_PERSON_REQUEST`;
export const ADD_PERSON_SUCCESS = `${appName}/${moduleName}/ADD_PERSON_SUCCESS`;

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_PERSON_SUCCESS:
      return state.update('entities', (entities) => entities.push(new PersonRecord(payload)));

    default:
      return state;
  }
}

export function addPerson(person) {
  return {
    type: ADD_PERSON_REQUEST,
    payload: person,
  };
}

export const addPersonSaga = function*(action) {
  const id = yield call(genId);

  yield put({
    type: ADD_PERSON_SUCCESS,
    payload: { ...action.payload, id },
  });
};

export const saga = function*() {
  yield takeEvery(ADD_PERSON_REQUEST, addPersonSaga);
};
