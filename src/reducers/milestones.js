const initialState = {
  currentMilestone: {
    tasks: [],
  },
  loadingMilestone: false,
}

export default (state = initialState, action) => {
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
      return {
        ...state,
        currentMilestone: { tasks: [] },
      }

    case "UPDATE_CURRENT_MILESTONE_PROGRESS":
      return {
        ...state,
        currentMilestone: {
          ...state.currentMilestone,
          progress: action.payload,
        },
      }

    default:
      return state
  }
}
