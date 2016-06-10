const Component = ({
  data,
  columns
}) => (
  <table>
    <thead>
      <tr><th/>{ columns.map((cell, index) => <td key={cell.key}>{index + 1}</td>) }</tr>
    </thead>
    <tbody>
      { data.map((row, rowIndex) =>
        <tr key={row.key}>
          <th>{rowIndex + 1}</th>
          { row.columns.map((cell, cellIndex) => 
              <td key={cell.key} class={cell.cls} title={ "Cell " + (rowIndex + 1) + '/' + (cellIndex + 1) }>{cell.value}</td>
          ) }
        </tr>
      ) }
    </tbody>
  </table>
)

export default ReactRedux.connect(
  (state, props) => ({
    data: state.data,
    columns: state.data.length ? state.data[0].columns : []
  })
)(Component)
