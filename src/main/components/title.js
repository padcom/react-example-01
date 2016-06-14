import React from 'react';
import { connect } from 'react-redux';
import Counter from './counter';

const Title = ({
  title
}) => (
  <h1 class='title'><Counter />, {title}</h1>
);

export default connect(
  state => ({ title: state.title })
)(Title);
