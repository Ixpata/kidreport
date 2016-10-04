import React, { Component, PropTypes } from 'react';

export default class Kid extends Component {
  render() {
    return (
      <li>{this.props.kid.text}</li>
    );
  }
}

Kid.propTypes = {
  kid: PropTypes.object.isRequired,
};
