import React from 'react';

export default class Counter extends React.Component {
  constructor() {
    super();
    this.state = { counter: 0 };
  }
  render() {
    return (
      <span class="counter">Client: { ++this.state.counter }</span>
    )
  }
}
