import React, { Component } from 'react';

class ErrorField extends Component {
  render() {
    const {
      input,
      type,
      meta: { error, touched },
    } = this.props;

    return (
      <div>
        <label>
          <input {...input} {...{ type }} />
        </label>
        {touched && error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
    );
  }
}

export default ErrorField;
