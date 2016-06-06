import StatelessComponent from '../framework/stateless-component';
import DataStore from '../stores/data-store';

export default class Grid extends StatelessComponent {
  render() {
    // prepare header
    const headers = [<th key={"hdr"}></th>];
    for (let i = 0; i < this.props.data[0].columns.length; i++) {
      headers.push(<th key={"hdr-" + i}>{i + 1}</th>);
    }

    // prepare data rows
    const rows = [];
    for(let y = 0; y < this.props.data.length; y++) {
      const row = [<th key={"header-" + y}>{y + 1}</th>]
      for (let x = 0; x < this.props.data[y].columns.length; x++) {
        const title = "I am cell " + (x + 1) + "/" + (y + 1);
        const key = this.props.data[y].columns[x].key;
        const cls = this.props.data[y].columns[x].cls;
        const value = this.props.data[y].columns[x].value
        row.push( <td key={key} title={title} class={cls}>{value}</td>);
      }
      rows.push(<tr key={this.props.data[y].key}>{row}</tr>);
    }

    return (
      <table class={this.props.gridClass}>
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
}
