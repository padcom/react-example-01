'use strict';

let data = []
let rowCount = 25;
let colCount = 25;

function init(cols, rows) {
  data = [];
  rowCount = rows;
  colCount = cols;
  for (let y = 0; y < rowCount; y++) {
    let columns = [];
    for (let x = 0; x < colCount; x++) {
      columns.push(random());
    }
    data.push(columns);
  }

  return { data, randomize }
}

function random() {
  return Math.round(Math.random() * 999) + 1;
}

function randomize(count) {
  let modifiedCells = []

  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * colCount);
    const y = Math.floor(Math.random() * rowCount);
    const value = random();
    data[y][x] = value;
    modifiedCells.push({ x, y, value });
  }

  return modifiedCells;
}

module.exports = { init }
