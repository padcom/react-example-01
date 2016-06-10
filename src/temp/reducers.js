import { cloneDeep } from 'lodash';

// state.title

export const titleChanged = (title) => ({
  type: "TITLE_CHANGED",
  title
})

export const title = (state = "Hello", action) => {
  switch(action.type) {
    case "TITLE_CHANGED":
      return action.title;
    default:
      return state;
  }
}

// state.data

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const applyDelta = (delta) => (dispatch) => {
  dispatch({ type: "DATA_CHANGED", data: delta });
  delay(100).then(() => {
    dispatch({ type: "CLEAR_COLORS", data: delta });
  })
}

export const convertDataFromServer = (data) => {
  const result = [];
  const rowcount = data.length;
  const colcount = data.length > 0 ? data[0].length : 0;
  for (let y = 0; y < rowcount; y++) {
    const columns = [];
    for (let x = 0; x < colcount; x++) {
      columns.push({ key: (y * colcount + x), value: data[y][x], cls: "" });
    }
    result.push({ key: "row-" + y, columns: columns });
  }
  return result;
}

const clearColors = (data, delta) => {
  const result = cloneDeep(data);
  for (let i = 0; i < delta.length; i++) {
    result[delta[i].y].columns[delta[i].x].cls = "";
  }
  return result;
}

const applyDataDelta = (data, delta) => {
  const result = cloneDeep(data);
  for (let i = 0; i < delta.length; i++) {
    const x = delta[i].x;
    const y = delta[i].y;

    result[y].columns[x].cls = (result[y].columns[x].value > delta[i].value) ? 'red' : 'green';
    result[y].columns[x].value = delta[i].value;
  }
  return result;
}

export const data = (state = [], action) => {
  switch(action.type) {
    case "DATA_RECEIVED":
      return convertDataFromServer(action.data);
    case "DATA_CHANGED":
      if (state.length > 0)
        return applyDataDelta(state, action.data);
      else
        return statel;
    case "CLEAR_COLORS":
      return clearColors(state, action.data);
    default:
      return state;
  }
}
