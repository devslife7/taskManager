const initialState = {
  currentMilestone: {
    tasks: [],
  },
  loadingMilestone: false,
}

export default (state = initialState, action) => {
  let idx
  switch (action.type) {
    case "LOADING_MILESTONE":
      return {
        ...state,
        loadingMilestone: true,
      }

    case "SET_CURRENT_MILESTONE":
      return {
        ...state,
        currentMilestone: action.payload,
        loadingMilestone: false,
      }

    case "CLEAR_CURRENT_MILESTONE":
      localStorage.removeItem("currentMilestoneId")

      return {
        ...state,
        currentMilestone: { tasks: [] },
      }

    case "UPDATE_CURRENT_MILESTONE_PROGRESS":
      const updatedTask = {
        ...action.payload.task,
        progress: action.payload.taskProgress,
      }

      idx = state.currentMilestone.tasks.findIndex(task => task.id === action.payload.task.id)
      return {
        ...state,
        currentMilestone: {
          ...state.currentMilestone,
          progress: action.payload.milestoneProgress,
          tasks: [
            ...state.currentMilestone.tasks.slice(0, idx),
            updatedTask,
            ...state.currentMilestone.tasks.slice(idx + 1),
          ],
        },
      }

    default:
      return state
  }
}
