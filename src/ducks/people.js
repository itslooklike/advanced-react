import { Record, List } from 'immutable';
import { appName } from '../config';

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
export const ADD_PERSON = `${appName}/${moduleName}/ADD_PERSON`;

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_PERSON:
      return state.update('entities', (entities) => entities.push(new PersonRecord(payload)));

    default:
      return state;
  }
}

export function addPerson(person) {
  return (dispatch) => {
    dispatch({
      type: ADD_PERSON,
      payload: {
        id: new Date(),
        ...person,
      },
    });
  };
}
