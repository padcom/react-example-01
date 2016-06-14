import React from 'react';
import { connect } from 'react-redux';
import Counter from './counter';
import DataGrid from './data-grid';

const App = ({
  title
}) => (
  <div>
    <h1 class={'title'}><Counter />, {title}</h1>
    <DataGrid />
  </div>
)

export default connect(
  state => ({ title: state.title })
)(App);