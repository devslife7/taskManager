const initialState = {
  currentTask: {
    entries: [],
  },
  loadingTask: false,
}

export default (state = initialState, action) => {
  let idx
  switch (action.type) {
    case 'LOADING_TASK':
      return {
        ...state,
        loadingTask: true,
      }

    case 'SET_CURRENT_TASK':
      return {
        ...state,
        currentTask: action.payload,
        loadingTask: false,
      }

    case 'CLEAR_CURRENT_TASK':
      localStorage.removeItem('currentTaskId')
      return {
        ...state,
        currentTask: { entries: [] },
      }

    case 'ADD_ENTRY':
      return {
        ...state,
        currentTask: {
          ...state.currentTask,
          progress: action.payload.task.progress,
          entries: [...state.currentTask.entries, action.payload.entry],
        },
      }

    case 'EDIT_ENTRY':
      idx = state.currentTask.entries.findIndex(entry => entry.id === action.payload.entry.id)
      return {
        ...state,
        currentTask: {
          ...state.currentTask,
          progress: action.payload.task.progress,
          entries: [
            ...state.currentTask.entries.slice(0, idx),
            action.payload.entry,
            ...state.currentTask.entries.slice(idx + 1),
          ],
        },
      }

    case 'DELETE_ENTRY':
      idx = state.currentTask.entries.findIndex(entry => entry.id === action.payload.entry_id)
      return {
        ...state,
        currentTask: {
          ...state.currentTask,
          progress: action.payload.task.progress,
          entries: [...state.currentTask.entries.slice(0, idx), ...state.currentTask.entries.slice(idx + 1)],
        },
      }

    default:
      return state
  }
}
