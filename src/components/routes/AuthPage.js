import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';

import SignInForm from '../auth/SignInForm';
import SignUpForm from '../auth/SignUpForm';

class AuthPage extends Component {
  onSignInSubmitHandler = (values) => {
    console.log('onSignInSubmitHandler', values);
  };

  onSignUpFormSubmitHandler = (values) => {
    console.log('onSignUpFormSubmitHandler', values);
  };

  render() {
    return (
      <div>
        <h1>AuthPage</h1>
        <NavLink to="/auth/signin">Sign In</NavLink>
        <NavLink to="/auth/signup">Sign Up</NavLink>
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

export default AuthPage;
