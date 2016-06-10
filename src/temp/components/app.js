import React from 'react';
import { connect } from 'react-redux';
import { DataGrid } from './data-grid';

const Component = ({
  title
}) => (
  <div>
    <h1>{title}!</h1>
    <DataGrid />
  </div>
)

export const App = connect(
  (state, props) => ({ title: state.title }),
  (dispatch, props) => ({ })
)(Component);

export const title = (state = "Hello", action) => {
  switch(action.type) {
    case "TITLE_CHANGED":
      return action.title;
    default:
      return state;
  }
}
