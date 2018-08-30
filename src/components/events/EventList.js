import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Column } from 'react-virtualized';
import 'react-virtualized/styles.css';

import Spinner from '../common/Spinner';
import { eventsFetch, selectEvent, eventsListSelector } from '../../ducks/events';

export class EventList extends Component {
  componentDidMount() {
    this.props.eventsFetch();
  }

  onClickHandler = (uid) => () => {
    const { selectEvent } = this.props;
    selectEvent && selectEvent(uid);
  };

  onVirtualClickHandler = (rowData) => {
    const { selectEvent } = this.props;
    selectEvent && selectEvent(rowData.uid);
  };

  rowGetter = ({ index }) => {
    return this.props.events[index];
  };

  render() {
    const { events } = this.props;

    return (
      <div>
        <h2>EventList Data HERE</h2>

        {events.length ? (
          <div>
            <div className="card">
              <div className="card-header">Virtualize Table</div>
              <div className="card-body">
                <Table
                  rowCount={events.length}
                  rowGetter={this.rowGetter}
                  rowHeight={40}
                  headerHeight={50}
                  width={700}
                  height={100}
                  onRowClick={this.onVirtualClickHandler}
                >
                  <Column label="title" dataKey="title" width={250} />
                  <Column label="where" dataKey="where" width={250} />
                </Table>
              </div>
            </div>

            <table className="table">
              <tbody>
                {events.map((event) => (
                  <tr
                    key={event.uid}
                    className="test-list-row"
                    onClick={this.onClickHandler(event.uid)}
                  >
                    <th scope="col">{event.title}</th>
                    <th scope="col">{event.where}</th>
                    <th scope="col">{event.when}</th>
                  </tr>
                ))}
              </tbody>
            </table>
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
    selectEvent,
  }
)(EventList);
