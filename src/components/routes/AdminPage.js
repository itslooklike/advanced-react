import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class AdminPage extends Component {
  render() {
    return (
      <div>
        <h1>AdminPage</h1>
        <div>
          <NavLink to="/events">Got to Events!</NavLink>
        </div>
      </div>
    );
  }
}

export default AdminPage;
