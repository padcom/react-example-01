import StatelessComponent from '../framework/stateless-component';
import DataStore from '../stores/data-store';

export default class Grid extends StatelessComponent {
  render() {
    let data = this.props.data;
    if (!data) return null;

    // prepare header
    const headers = [<th key={"hdr"}></th>];
    for (let i = 0; i < data[0].columns.length; i++) {
      headers.push(<th key={"hdr-" + i}>{i + 1}</th>);
    }

    // prepare data rows
    const rows = [];
    for(let y = 0; y < data.length; y++) {
      const row = [<th key={"header-" + y}>{y + 1}</th>]
      for (let x = 0; x < data[y].columns.length; x++) {
        const title = "I am cell " + (x + 1) + "/" + (y + 1);
        const key = data[y].columns[x].key;
        const cls = data[y].columns[x].cls;
        const value = data[y].columns[x].value
        row.push( <td key={key} title={title} class={cls}>{value}</td>);
      }
      rows.push(<tr key={data[y].key}>{row}</tr>);
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
