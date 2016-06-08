import dispatcher from '../framework/dispatcher';

export function dataChanged(data) {
  dispatcher.dispatch({
    type: "DATA_CHANGED",
    data
  });
}
