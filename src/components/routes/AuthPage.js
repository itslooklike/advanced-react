import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { signUp, moduleName } from '../../ducks/auth';
import SignInForm from '../auth/SignInForm';
import SignUpForm from '../auth/SignUpForm';

class AuthPage extends Component {
  onSignInSubmitHandler = (values) => {
    console.log('onSignInSubmitHandler', values);
  };

  onSignUpFormSubmitHandler = ({ email, password }) => this.props.signUp(email, password);

  render() {
    const { loading, error } = this.props;

    return (
      <div>
        <h1>AuthPage</h1>
        <NavLink to="/auth/signin">Sign In</NavLink>
        <NavLink to="/auth/signup">Sign Up</NavLink>
        {loading && <div>Loading...</div>}
        {error && <div>{JSON.stringify(error)}</div>}
        <Route
          path="/auth/signin"
          render={() => <SignInForm onSubmit={this.onSignInSubmitHandler} />}
        />
        <Route
          path="/auth/signup"
          render={() => <SignUpForm onSubmit={this.onSignUpFormSubmitHandler} />}
        />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    loading: state[moduleName].loading,
    error: state[moduleName].error,
  }),
  { signUp }
)(AuthPage);
