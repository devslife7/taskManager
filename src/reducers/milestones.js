const initialState = {
  currentMilestone: {
    tasks: []
  },
  loading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOADING_MILESTONE":
      return {
        ...state,
        loading: true
      }

    case "SET_CURRENT_MILESTONE":
      return {
        ...state,
        currentMilestone: action.payload,
        loading: false
      }

    default:
      return state
  }
}
