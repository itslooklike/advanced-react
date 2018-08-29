import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import events from '../../mocks/conferences';
import { genId } from '../../ducks/utils';
import { EventList } from './EventList';
import Spinner from '../common/Spinner';

configure({ adapter: new Adapter() });

const testEvents = events.map((event) => ({ ...event, uid: genId() }));

it('should render loader', () => {
  const container = shallow(<EventList events={[]} eventsFetch={Function.prototype} />);

  expect(container.contains(<Spinner />));
});

it('should render events list', () => {
  const container = shallow(<EventList events={testEvents} eventsFetch={Function.prototype} />);
  const rows = container.find('.test-list-row');

  expect(rows.length).toEqual(events.length);
});

it('should request fetch data', (done) => {
  mount(<EventList events={[]} eventsFetch={done} />);
});

it('should select event', () => {
  let selected = null;
  const selectEvent = (uid) => (selected = uid);

  const container = mount(
    <EventList events={testEvents} eventsFetch={Function.prototype} selectEvent={selectEvent} />
  );

  container
    .find('.test-list-row')
    .first()
    .simulate('click');

  expect(selected).toEqual(testEvents[0].uid);
});
