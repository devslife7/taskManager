const initialState = {
  currentTask: {
    entries: []
  },
  loading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOADING_DATA":
      return {
        ...state,
        loading: true
      }

    case "SET_CURRENT_TASK":
      return {
        ...state,
        currentTask: action.payload,
        loading: false
      }

    default:
      return state
  }
}
