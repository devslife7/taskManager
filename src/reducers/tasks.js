const initialState = {
  currentTask: {
    entries: []
  },
  loadingTask: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOADING_TASK":
      return {
        ...state,
        loadingTask: true
      }

    case "SET_CURRENT_TASK":
      return {
        ...state,
        currentTask: action.payload,
        loadingTask: false
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
