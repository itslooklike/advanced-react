import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import store from './redux';
import Root from './components/Root';
import history from './history';

// import './mocks/index';

class App extends Component {
  render() {
    return (
      <Provider {...{ store }}>
        <ConnectedRouter {...{ history }}>
          <Root />
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
