import React from 'react';
import { connect } from 'react-redux';

const Component = ({
  data,
  columns
}) => (
  <table>
    <thead>
      <tr><th/>{ columns.map((cell, index) => <td key={cell.key}>{index + 1}</td>) }</tr>
    </thead>
    <tbody>
      { data.map((row, index) =>
        <tr key={row.key}>
          <th>{index + 1}</th>
          { row.columns.map(cell => <td key={cell.key} class={cell.cls}>{cell.value}</td>) }
        </tr>
      ) }
    </tbody>
  </table>
)

export const DataGrid = connect(
  (state, props) => ({
    data: state.data,
    columns: state.data.length ? state.data[0].columns : []
  })
)(Component)
