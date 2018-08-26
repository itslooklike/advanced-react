import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import emailValidator from 'email-validator';

import ErrorField from './ErrorField';

const validate = ({ email, password }) => {
  const errors = {};

  if (!email) {
    errors.email = 'необходимо ввести email';
  } else if (!emailValidator.validate(email)) {
    errors.email = 'введен не валидный email';
  }

  if (!password) {
    errors.password = 'необходимо ввести пароль';
  } else if (password.length < 6) {
    errors.password = 'пароль слишком короткий';
  }

  return errors;
};

class SignUpForm extends Component {
  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Email <Field name="email" component={ErrorField} />
            </label>
          </div>
          <div>
            <label>
              Password <Field name="password" component={ErrorField} type="password" />
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
  validate,
})(SignUpForm);
