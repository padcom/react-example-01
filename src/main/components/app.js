import React from 'react';
import { connect } from 'react-redux';
import DataGrid from 'components/data-grid';
import Title from 'components/title';
import { Link } from 'react-router';

const App = () => (
  <div class="app">
    <Link to="/counter">Counter</Link> | <Link to="/data-grid">Data Grid</Link>
    <Title />
    <DataGrid />
  </div>
);

export default connect(
  state => ({ title: state.title })
)(App);
