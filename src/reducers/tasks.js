const initialState = {
  currentTask: {
    entries: []
  },
  loading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOADING_TASK":
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

    case "ADD_ENTRY":
      return {
        ...state,
        currentTask: {
          ...state.currentTask,
          entries: [...state.currentTask.entries, action.payload]
        }
      }

    default:
      return state
  }
}
