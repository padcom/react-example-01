export default class Grid extends React.Component {
  constructor() {
    super();
    this.colcount = 25;
    this.rowcount = 20;
    this.rows = [];
    for (let y = 0; y < this.rowcount; y++) {
      let columns = [];
      for (let x = 0; x < this.colcount; x++) {
        columns.push({ key: (y * this.colcount + x), value: this.random(), cls: "" });
      }
      this.rows.push({ key: "row-" + y, columns: columns });
    }
  }

  clearCell(x, y) {
    setTimeout(function() {
      this.rows[y].columns[x].cls = "";
    }.bind(this), 200);
  }

  random() {
    return Math.round(Math.random() * 999) + 1;
  }

  randomize(count) {
    for (let i = 0; i < count; i++) {
      let x = Math.floor(Math.random() * this.colcount);
      let y = Math.floor(Math.random() * this.rowcount);
      let newValue = this.random();
      this.rows[y].columns[x].cls = (this.rows[y].columns[x].value > newValue) ? 'red' : 'green';
      this.rows[y].columns[x].value = newValue;
      this.clearCell.bind(this)(x, y);
    }
  }

  render() {
    const headers = [<th key={"hdr"}></th>];
    for (let i = 0; i < this.colcount; i++) {
      headers.push(<th key={"hdr-" + i}>{i + 1}</th>);
    }
    this.randomize(100);

    const rows = [];
    for(let y = 0; y < this.rowcount; y++) {
      const row = [<th key={"header-" + y}>{y + 1}</th>]
      for (let x = 0; x < this.colcount; x++) {
        const title = "I am cell " + (x + 1) + "/" + (y + 1);
        const key = this.rows[y].columns[x].key;
        const cls = this.rows[y].columns[x].cls;
        const value = this.rows[y].columns[x].value
        row.push( <td key={key} title={title} class={cls}>{value}</td>);
      }
      rows.push(<tr key={this.rows[y].key}>{row}</tr>);
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
