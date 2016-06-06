import Store from '../framework/store';

class DataStore extends Store {
  constructor() {
    super();
    this.colcount = 25;
    this.rowcount = 20;
    this.rows = [];
    for (let y = 0; y < this.rowcount; y++) {
      let columns = [];
      for (let x = 0; x < this.colcount; x++) {
        columns.push({ key: (y * this.colcount + x), value: this._random(), cls: "" });
      }
      this.rows.push({ key: "row-" + y, columns: columns });
    }
  }

  getData() {
    return this.rows;
  }

  handler(action) {
    switch(action.type) {
      case "DATA_CHANGED": {
        this._randomize(action.amount || 10);
      }
    }
  }

  _random() {
    return Math.round(Math.random() * 999) + 1;
  }

  _clearCell(cells) {
    setTimeout(function() {
      for (let i = 0; i < cells.length; i++) {
        this.rows[cells[i].y].columns[cells[i].x].cls = "";
      }
      this.emit("data-changed");
    }.bind(this), 100);
  }

  _randomize(count) {
    let modifiedCells = []
    for (let i = 0; i < count; i++) {
      let x = Math.floor(Math.random() * this.colcount);
      let y = Math.floor(Math.random() * this.rowcount);
      modifiedCells.push({ x, y });
      let newValue = this._random();
      this.rows[y].columns[x].cls = (this.rows[y].columns[x].value > newValue) ? 'red' : 'green';
      this.rows[y].columns[x].value = newValue;
    }
    this.emit("data-changed");
    this._clearCell.bind(this)(modifiedCells);
  }
}

export default new DataStore();
