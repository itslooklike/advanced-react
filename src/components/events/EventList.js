import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../common/Spinner';
import { eventsFetch, eventsListSelector } from '../../ducks/events';

class EventList extends Component {
  componentDidMount() {
    this.props.eventsFetch();
  }

  render() {
    const { events } = this.props;

    return (
      <div>
        <h2>EventList Data HERE</h2>

        {events.length ? (
          <div>
            {events.map((item) => (
              <div key={item.uid}>{item.title}</div>
            ))}
          </div>
        ) : (
          <Spinner />
        )}
        {/* {error && <div>{JSON.stringify(error.message)}</div>} */}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    events: eventsListSelector(state),
  }),
  {
    eventsFetch,
  }
)(EventList);
