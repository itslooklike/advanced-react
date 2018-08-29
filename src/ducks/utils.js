import nanoid from 'nanoid';
import { OrderedMap, Map } from 'immutable';

export function genId() {
  return nanoid();
}

export function fbDataToEntities(data, RecordModel = Map) {
  return new OrderedMap(data).mapEntries(([uid, value]) => [
    uid,
    new RecordModel(value).set('uid', uid),
  ]);
}
