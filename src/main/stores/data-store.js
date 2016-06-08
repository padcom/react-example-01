import Store from '../framework/store';

class DataStore extends Store {
  constructor() {
    super();
    this._initializeData('http://localhost:8001/data');
  }

  getData() {
    return this.rows;
  }

  handler(action) {
    switch(action.type) {
      case "DATA_CHANGED": {
        this._storeChangedData(action.data);
      }
    }
  }

  _initializeData(source) {
    fetch(source)
      .then(response => response.json())
      .then(data => {
        this.rows = [];
        this.rowcount = data.length;
        this.colcount = data.length > 0 ? data[0].length : 0;
        for (let y = 0; y < this.rowcount; y++) {
          let columns = [];
          for (let x = 0; x < this.colcount; x++) {
            columns.push({ key: (y * this.colcount + x), value: data[y][x], cls: "" });
          }
          this.rows.push({ key: "row-" + y, columns: columns });
        }
        this.emit("data-changed");
      })
      .catch(e => console.error(e))
  }

  _clearCell(cells) {
    setTimeout(function() {
      for (let i = 0; i < cells.length; i++) {
        const x = cells[i].x, y = cells[i].y;
        this.rows[y].columns[x].cls = "";
      }
      this.emit("data-changed");
    }.bind(this), 100);
  }

  _storeChangedData(data) {
    for (let i = 0; i < data.length; i++) {
      const x = data[i].x;
      const y = data[i].y;
      this.rows[y].columns[x].cls = (this.rows[y].columns[x].value > data[i].value) ? 'red' : 'green';
      this.rows[y].columns[x].value = data[i].value;
    }
    this.emit("data-changed");
    this._clearCell.bind(this)(data);
  }
}

export default new DataStore();
