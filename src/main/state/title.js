import { mapActionToReducer } from 'utils/reducer-creator';

export default {
  titleChanged: (title) => ({
    type: 'TITLE_CHANGED',
    payload: title
  })
}

export const reducer = mapActionToReducer({
  'TITLE_CHANGED': (state, action) => action.payload
});
