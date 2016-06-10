// state.title

export const titleChanged = (title) => ({
  type: "TITLE_CHANGED",
  title
})

// state.data

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const setData = (data) => ({
  type: "DATA_RECEIVED",
  data
});

export const applyDelta = (delta) => (dispatch) => {
  dispatch({ type: "DATA_CHANGED", data: delta });
  delay(50).then(() => {
    dispatch({ type: "CLEAR_COLORS", data: delta });
  })
}
