const initialState = {}

export default (state = initialState, action) => {
  let idx
  switch (action.type) {
    case 'LOADING_TASK':
      return {
        ...state,
        loadingTask: true,
      }

    default:
      return state
  }
}
