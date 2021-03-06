const initialState = {
  currentMilestone: {
    tasks: [],
  },
  loadingMilestone: false,
}

export default (state = initialState, action) => {
  let idx
  switch (action.type) {
    case 'LOADING_MILESTONE':
      return {
        ...state,
        loadingMilestone: true,
      }

    case 'SET_CURRENT_MILESTONE':
      return {
        ...state,
        currentMilestone: action.payload,
        loadingMilestone: false,
      }

    case 'CLEAR_CURRENT_MILESTONE':
      localStorage.removeItem('currentMilestoneId')

      return {
        ...state,
        currentMilestone: { tasks: [] },
      }

    case 'UPDATE_MILESTONE':
      idx = state.currentMilestone.tasks.findIndex(task => task.id === action.payload.task.id)
      return {
        ...state,
        currentMilestone: {
          ...state.currentMilestone,
          progress: action.payload.milestone.progress,
          tasks: [
            ...state.currentMilestone.tasks.slice(0, idx),
            { ...state.currentMilestone.tasks[idx], progress: action.payload.task.progress },
            ...state.currentMilestone.tasks.slice(idx + 1),
          ],
        },
      }

    case 'ADD_TASK':
      return {
        ...state,
        currentMilestone: {
          ...state.currentMilestone,
          progress: action.payload.milestone.progress,
          tasks: [...state.currentMilestone.tasks, action.payload.task],
        },
      }

    case 'EDIT_TASK':
      idx = state.currentMilestone.tasks.findIndex(task => task.id === action.payload.task.id)
      return {
        ...state,
        currentMilestone: {
          ...state.currentMilestone,
          tasks: [
            ...state.currentMilestone.tasks.slice(0, idx),
            action.payload.task,
            ...state.currentMilestone.tasks.slice(idx + 1),
          ],
        },
      }

    case 'DELETE_TASK':
      idx = state.currentMilestone.tasks.findIndex(task => task.id === action.payload.task.id)
      return {
        ...state,
        currentMilestone: {
          ...state.currentMilestone,
          progress: action.payload.milestone.progress,
          tasks: [
            ...state.currentMilestone.tasks.slice(0, idx),
            ...state.currentMilestone.tasks.slice(idx + 1),
          ],
        },
      }

    default:
      return state
  }
}
