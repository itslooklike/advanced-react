import { addPersonSaga, ADD_PERSON_REQUEST, ADD_PERSON_SUCCESS } from './people';
import { call, put } from 'redux-saga/effects';

import { genId } from './utils';

it('should dispatch person with id', () => {
  const person = {
    firstName: 'Ogni',
    lastName: 'Lnnnok',
    email: 'no@no.no',
  };

  const saga = addPersonSaga({
    type: ADD_PERSON_REQUEST,
    payload: person,
  });

  expect(saga.next().value).toEqual(call(genId));

  const id = genId();

  expect(saga.next(id).value).toEqual(
    put({
      type: ADD_PERSON_SUCCESS,
      payload: { ...person, id },
    })
  );
});
