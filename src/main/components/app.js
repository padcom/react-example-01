import React from 'react';
import { connect } from 'react-redux';
import DataGrid from 'components/data-grid';
import Title from 'components/title';

const App = () => (
  <div class="app">
    <Title />
    <DataGrid />
  </div>
);

export default connect(
  state => ({ title: state.title })
)(App);
