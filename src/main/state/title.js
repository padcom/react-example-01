export default {
  titleChanged: (title) => ({
    type: 'TITLE_CHANGED',
    title
  })
}

export const reducer = (state = '', action) => {
  switch(action.type) {
    case 'TITLE_CHANGED':
      return action.title;
    default:
      return state;
  }
}
