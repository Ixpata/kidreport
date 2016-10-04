import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Kids } from '../api/kids.js';

import Kid from './Kid.jsx';

// App component - represents the whole app
class App extends Component {
  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Kids.insert({
      text,
      createdAt: new Date(), // current time
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  renderKids() {
    return this.props.kids.map((kid) => (
      <Kid key={kid._id} kid={kid} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Kids</h1>

          <form className="new-kid" onSubmit={this.handleSubmit.bind(this)} >
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new kids"
            />
          </form>
        </header>

        <ul>
          {this.renderKids()}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  kids: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    kids: Kids.find({}, { sort: { text: 1 } }).fetch(),
  };
}, App);
