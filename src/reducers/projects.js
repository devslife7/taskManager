const initialState = {
  allProjects: [],
  currentProject: {},
  loading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOADING_DATA":
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

    case "SET_CURRENT_PROJECT":
      return {
        ...state,
        currentProject: action.payload,
        loading: false
      }

    default:
      return state
  }
}
