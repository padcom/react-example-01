import DataGrid from './data-grid';

const Component = ({
  title
}) => (
  <div>
    <h1>{title}!</h1>
    <DataGrid />
  </div>
)

export default ReactRedux.connect(
  (state, props) => ({ title: state.title }),
  (dispatch, props) => ({ })
)(Component);
