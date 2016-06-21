import React from 'react';
import { connect } from 'react-redux';
import Counter from '../components/counter';

const Title = ({
  title
}) => (
  <div>
    <h1 class="title"><Counter />, {title}</h1>
  </div>
);

export default connect(
  state => ({ title: state.title })
)(Title);
