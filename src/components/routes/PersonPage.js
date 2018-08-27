import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addPerson } from '../../ducks/people';
import PersonAdd from '../people/PersonAdd';

class PersonPage extends Component {
  onAddPersonHandler = (person) => this.props.addPerson(person);

  render() {
    return (
      <div>
        <h1>PersonPage</h1>
        <PersonAdd onSubmit={this.onAddPersonHandler} />
      </div>
    );
  }
}

export default connect(
  null,
  { addPerson }
)(PersonPage);
