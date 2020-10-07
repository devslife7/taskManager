const initialState = {
  currentTask: {
    entries: [],
  },
  loadingTask: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOADING_TASK":
      return {
        ...state,
        loadingTask: true,
      }

    case "SET_CURRENT_TASK":
      return {
        ...state,
        currentTask: action.payload,
        loadingTask: false,
      }

    case "CLEAR_CURRENT_TASK":
      localStorage.removeItem("currentTaskId")
      return {
        ...state,
        currentTask: { entries: [] },
      }
    case "UPDATE_CURRENT_TASK_PROGRESS":
      return {
        ...state,
        currentTask: {
          ...state.currentTask,
          progress: action.payload.taskProgress,
          entries: [...state.currentTask.entries, action.payload.entry],
        },
      }

    default:
      return state
  }
}
