import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

class SignUpForm extends Component {
  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Email <Field name="email" component="input" />
            </label>
          </div>
          <div>
            <label>
              Password <Field name="password" component="input" />
            </label>
          </div>
          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'signIn',
})(SignUpForm);
