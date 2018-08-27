import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import ErrorField from '../common/ErrorField';

class PersonAdd extends Component {
  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <h2>Add user</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              First name <Field name="firstName" component={ErrorField} />
            </label>
          </div>
          <div>
            <label>
              Last name <Field name="lastName" component={ErrorField} />
            </label>
          </div>
          <div>
            <label>
              email <Field name="email" component={ErrorField} />
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
  form: 'people',
})(PersonAdd);
