import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../common/Spinner';
import { eventsFetch, eventsListSelector } from '../../ducks/events';

export class EventList extends Component {
  componentDidMount() {
    this.props.eventsFetch();
  }

  onClickHandler = (uid) => () => {
    const { selectEvent } = this.props;
    selectEvent && selectEvent(uid);
  };

  render() {
    const { events } = this.props;

    return (
      <div>
        <h2>EventList Data HERE</h2>

        {events.length ? (
          <div>
            {events.map((event) => (
              <div
                key={event.uid}
                className="test-list-row"
                onClick={this.onClickHandler(event.uid)}
              >
                {event.title}
              </div>
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
