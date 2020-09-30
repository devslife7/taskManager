const initialState = {
  allProjects: [],
  loading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOADING_PROJECTS":
      console.log("enters loading projects reducer")
      return {
        ...state,
        loading: true
      }

    case "SET_ALL_PROJECTS":
      return {
        ...state,
        allProjects: action.payload,
        loading: false
      }

    default:
      return state
  }
}
