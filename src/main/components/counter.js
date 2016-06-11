import React from 'react';

export default class Counter extends React.Component {
  constructor() {
    super();
    this.state = { counter: 0 };
  }
  render() {
    return (
      <span>Counter: { this.state.counter++ }</span>
    )
  }
}
