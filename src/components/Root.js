import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import ProtectedRoute from './common/ProtectedRoute';
import AdminPage from './routes/AdminPage';
import AuthPage from './routes/AuthPage';
import PersonPage from './routes/PersonPage';
import EventsPage from './routes/EventsPage';

class Root extends Component {
  render() {
    return (
      <div>
        <ProtectedRoute path="/" exact component={AdminPage} />
        <ProtectedRoute path="/events" component={EventsPage} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/people" component={PersonPage} />
      </div>
    );
  }
}

export default Root;
