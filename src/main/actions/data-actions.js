import dispatcher from '../framework/dispatcher';

export function dataChanged(amount) {
  dispatcher.dispatch({
    type: "DATA_CHANGED",
    amount
  });
}
