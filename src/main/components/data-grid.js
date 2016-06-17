import React from 'react';
import { connect } from 'react-redux';

const DataGrid = ({
  data,
  columns
}) => (
  <table class="data-grid">
    <thead>
      <tr>
        <th/>
        { columns.map((cell, index) =>
          <th key={cell.key}>{index + 1}</th>
        ) }
      </tr>
    </thead>
    <tbody>
      { data.map((row, rowIndex) =>
        <tr key={row.key}>
          <th>{rowIndex + 1}</th>
          { row.columns.map((cell, cellIndex) =>
            <td key={cell.key} class={cell.cls} title={ 'Cell ' + (rowIndex + 1) + '/' + (cellIndex + 1) }>{cell.value}</td>
          ) }
        </tr>
      ) }
    </tbody>
  </table>
)

export default connect(
  state => ({
    data: state.data,
    columns: state.data.length ? state.data[0].columns : []
  })
)(DataGrid)
