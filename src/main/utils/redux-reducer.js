/**
 * Creates a reducer from a map with action entries
 */
export function mapActionToReducer(reducers) {
  return (state = [], action) => {
    if (reducers[action.type]) {
      return reducers[action.type](state, action);
    } else {
      return state;
    }
  }
}
