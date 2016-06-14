import React from 'react';
import { connect } from 'react-redux';
import Counter from './counter';
import DataGrid from './data-grid';
import Title from './title';

const App = ({
  title
}) => (
  <div>
    <Title />
    <DataGrid />
  </div>
)

export default connect(
  state => ({ title: state.title })
)(App);
