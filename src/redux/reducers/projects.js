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
    case 'LOADING_PROJECT':
      return {
        ...state,
        loadingProject: true,
      }

    case 'SET_ALL_PROJECTS':
      return {
        ...state,
        allProjects: action.payload,
        loadingProject: false,
      }

    case 'SET_CURRENT_PROJECT':
      return {
        ...state,
        currentProject: action.payload,
        loadingProject: false,
      }

    case 'UPDATE_PROJECT':
      let idx1 = state.allProjects.findIndex(project => project.id === action.payload.project.id)
      let idx2 = state.currentProject.milestones.findIndex(
        milestone => milestone.id === action.payload.milestone.id
      )
      return {
        ...state,
        allProjects: [
          ...state.allProjects.slice(0, idx1),
          { ...state.allProjects[idx1], progress: action.payload.project.progress },
          ...state.allProjects.slice(idx1 + 1),
        ],
        currentProject: {
          ...state.currentProject,
          progress: action.payload.project.progress,
          milestones: [
            ...state.currentProject.milestones.slice(0, idx2),
            { ...state.currentProject.milestones[idx2], progress: action.payload.milestone.progress },
            ...state.currentProject.milestones.slice(idx2 + 1),
          ],
        },
      }

    case 'CLEAR_CURRENT_PROJECT':
      localStorage.removeItem('currentProjectId')
      return {
        ...state,
        currentProject: { milestones: [] },
      }

    case 'ADD_PROJECT':
      return {
        ...state,
        allProjects: [...state.allProjects, action.payload],
      }

    case 'REMOVE_PROJECT':
      console.log('enters remove proj action', state)
      idx = state.allProjects.findIndex(proj => proj.id === action.payload)
      console.log('found idx: ', idx)
      console.log('first slice: ', state.allProjects.slice(0, idx))
      console.log('second slice: ', state.allProjects.slice(idx + 1))
      if (idx < 0) {
        idx = state.allProjects.length
      }
      console.log('parsed foundidx: ', idx)
      return {
        ...state,
        allProjects: [...state.allProjects.slice(0, idx), ...state.allProjects.slice(idx + 1)],
      }

    // case 'ADD_MILESTONE':
    //   return {
    //     ...state,
    //     currentMilestone: {
    //       ...state.currentMilestone,
    //       progress: action.payload.milestone.progress,
    //       tasks: [...state.currentMilestone.tasks, action.payload.task],
    //     },
    //   }

    default:
      return state
  }
}
