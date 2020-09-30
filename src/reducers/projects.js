const initialState = {
  allProjects: [],
  currentProject: {
    tasks: []
  },
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

    case "ADD_PROJECT":
      console.log("enters add prije action", state)
      return {
        ...state,
        allProjects: [...state.allProjects, action.payload]
      }

    default:
      return state
  }
}
