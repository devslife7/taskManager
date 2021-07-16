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

    case "UPDATE_ALLPROJECTS_PROGRESS":
      const projectUpdated = {
        id: action.payload.project.id,
        name: action.payload.project.name,
        progress: action.payload.project.progress,
        end_date: action.payload.project.end_date,
      }
      idx = state.allProjects.findIndex(project => project.id === action.payload.project.id)
      return {
        ...state,
        allProjects: [
          ...state.allProjects.slice(0, idx),
          projectUpdated,
          ...state.allProjects.slice(idx + 1),
        ],
      }

    case "UPDATE_CURRENT_PROJECT_MILESTONE":
      idx = state.currentProject.milestones.findIndex(
        milestone => milestone.id === action.payload.milestone.id
      )
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          milestones: [
            ...state.currentProject.milestones.slice(0, idx),
            action.payload.milestone,
            ...state.currentProject.milestones.slice(idx + 1),
          ],
        },
      }

    case "UPDATE_CURRENT_PROJECT_PROGRESS":
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          progress: action.payload.projectProgress,
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

    default:
      return state
  }
}
