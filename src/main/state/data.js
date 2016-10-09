import { cloneDeep } from 'lodash';
import { mapActionToReducer } from 'utils/redux-reducer';
import { delay } from 'utils/delay';

export default {
  loadInitialData: host => ({
    type: 'DATA_RECEIVED',
    payload: fetch('http://' + host + '/data').then(response => response.json())
  }),
  applyDelta: delta => dispatch => {
    dispatch({ type: 'DATA_CHANGED', payload: delta });
    dispatch({ type: 'CLEAR_COLORS', payload: delay(200).then(() => delta) })
  }
}

export const reducer = mapActionToReducer({
  'DATA_RECEIVED': (state, action) => convertDataFromServer(action.payload),
  'DATA_CHANGED' : (state, action) => state.length > 0 ? applyDataDelta(state, action.payload) : state,
  'CLEAR_COLORS' : (state, action) => clearColors(state, action.payload)
});

function convertDataFromServer(data) {
  return data.map((row, y) => ({
    key: 'row-' + y,
    columns: row.map((column, x) => ({
      key: y * row.length + x,
      value: data[y][x],
      cls: ''
    }))
  }));
}

function applyDataDelta(data, delta) {
  const result = cloneDeep(data);
  for (let i = 0; i < delta.length; i++) {
    const x = delta[i].x;
    const y = delta[i].y;
    result[y].columns[x].cls = (result[y].columns[x].value > delta[i].value) ? 'red' : 'green';
    result[y].columns[x].value = delta[i].value;
  }
  return result;
}

function clearColors(data, delta) {
  const result = cloneDeep(data);
  for (let i = 0; i < delta.length; i++) {
    result[delta[i].y].columns[delta[i].x].cls = '';
  }
  return result;
}
