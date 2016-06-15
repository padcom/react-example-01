import React from 'react';
import { connect } from 'react-redux';
import Counter from 'components/counter';
import DataGrid from 'components/data-grid';
import Title from 'components/title';

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
