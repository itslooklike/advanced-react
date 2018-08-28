import React, { Component } from 'react';
import { connect } from 'react-redux';

import { moduleName, eventsFetch } from '../../ducks/events';

class EventList extends Component {
  componentDidMount() {
    this.props.eventsFetch();
  }

  render() {
    const {
      events: { entities, loading, error },
    } = this.props;

    console.log('events', this.props.events.toJS());

    return (
      <div>
        <h2>EventList Data HERE</h2>
        {error && <div>{JSON.stringify(error.message)}</div>}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    events: state[moduleName],
  }),
  {
    eventsFetch,
  }
)(EventList);
