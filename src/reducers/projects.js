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
      return {
        ...state,
        allProjects: [...state.allProjects, action.payload]
      }
    case "REMOVE_PROJECT":
      console.log("enters remove proj action", state)
      let idx = state.allProjects.findIndex(proj => proj.id === action.payload)
      console.log("found idx: ", idx)
      console.log("first slice: ", state.allProjects.slice(0, idx))
      console.log("second slice: ", state.allProjects.slice(idx + 1))
      if (idx < 0) {
        idx = state.allProjects.length
      }
      console.log("parsed foundidx: ", idx)
      return {
        ...state,
        allProjects: [...state.allProjects.slice(0, idx), ...state.allProjects.slice(idx + 1)]
      }

    // case "REMOVE_WATCHPARTY":
    //   idx = state.currentUser.watchparties.findIndex(party => party.id === action.payload)
    //   console.log("found index", idx)
    //   return {
    //     ...state,
    //     currentUser: {
    //       ...state.currentUser,
    //       watchparties: [
    //         ...state.currentUser.watchparties.slice(0, idx),
    //         ...state.currentUser.watchparties.slice(idx + 1)
    //       ]
    //     }
    //   }

    default:
      return state
  }
}
