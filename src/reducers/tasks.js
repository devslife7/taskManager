const initialState = {
  currentTask: {
    entries: [],
  },
  loadingTask: false,
}

export default (state = initialState, action) => {
  let idx
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

    case "UPDATE_CURRENT_ENTRY":
      idx = state.currentTask.entries.findIndex(entry => entry.id === action.payload.entry.id)
      return {
        ...state,
        currentTask: {
          ...state.currentTask,
          entries: [
            ...state.currentTask.entries.slice(0, idx),
            action.payload.entry,
            ...state.currentTask.entries.slice(idx + 1),
          ],
        },
      }

    case "DELETE_ENTRY":
      idx = state.currentTask.entries.findIndex(entry => entry.id === action.payload)
      return {
        ...state,
        currentTask: {
          ...state.currentTask,
          entries: [...state.currentTask.entries.slice(0, idx), ...state.currentTask.entries.slice(idx + 1)],
        },
      }

    default:
      return state
  }
}
