const initialState = {
  allProjects: [],
  currentProject: {
    milestones: [],
  },
  loadingProject: false,
}

export default (state = initialState, action) => {
  let idx

  switch (action.type) {
    case "LOADING_PROJECT":
      return {
        ...state,
        loadingProject: true,
      }

    case "SET_ALL_PROJECTS":
      return {
        ...state,
        allProjects: action.payload,
        loadingProject: false,
      }

    case "SET_CURRENT_PROJECT":
      return {
        ...state,
        currentProject: action.payload,
        loadingProject: false,
      }

    case "UPDATE_CURRENT_PROJECT_PROGRESS":
      const currentProjectUpdated = {
        id: state.currentProject.id,
        name: state.currentProject.name,
        progress: action.payload.projectProgress,
        end_date: state.currentProject.end_date,
      }
      const updatedMilestone = {
        ...action.payload.milestone,
        progress: action.payload.milestoneProgress,
      }
      let idxProject = state.allProjects.findIndex(project => project.id === state.currentProject.id)
      let idxMilestone = state.currentProject.milestones.findIndex(
        milestone => milestone.id === action.payload.milestone.id
      )
      return {
        ...state,
        allProjects: [
          ...state.allProjects.slice(0, idxProject),
          currentProjectUpdated,
          ...state.allProjects.slice(idxProject + 1),
        ],
        currentProject: {
          ...state.currentProject,
          progress: action.payload.projectProgress,
          milestones: [
            ...state.currentProject.milestones.slice(0, idxMilestone),
            updatedMilestone,
            ...state.currentProject.milestones.slice(idxMilestone + 1),
          ],
        },
      }

    case "CLEAR_CURRENT_PROJECT":
      localStorage.removeItem("currentProjectId")
      return {
        ...state,
        currentProject: { milestones: [] },
      }

    case "ADD_PROJECT":
      return {
        ...state,
        allProjects: [...state.allProjects, action.payload],
      }

    case "ADD_TASK":
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          tasks: [...state.currentProject.tasks, action.payload],
        },
      }

    case "REMOVE_PROJECT":
      console.log("enters remove proj action", state)
      idx = state.allProjects.findIndex(proj => proj.id === action.payload)
      console.log("found idx: ", idx)
      console.log("first slice: ", state.allProjects.slice(0, idx))
      console.log("second slice: ", state.allProjects.slice(idx + 1))
      if (idx < 0) {
        idx = state.allProjects.length
      }
      console.log("parsed foundidx: ", idx)
      return {
        ...state,
        allProjects: [...state.allProjects.slice(0, idx), ...state.allProjects.slice(idx + 1)],
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
