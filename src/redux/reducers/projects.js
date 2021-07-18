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

    case 'CLEAR_CURRENT_PROJECT':
      localStorage.removeItem('currentProjectId')
      return {
        ...state,
        currentProject: { milestones: [] },
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

    case 'ADD_MILESTONE':
      idx = state.allProjects.findIndex(project => project.id === action.payload.project.id)
      return {
        ...state,
        allProjects: [
          ...state.allProjects.slice(0, idx),
          { ...state.allProjects[idx], progress: action.payload.project.progress },
          ...state.allProjects.slice(idx + 1),
        ],
        currentProject: {
          ...state.currentProject,
          progress: action.payload.project.progress,
          milestones: [...state.currentProject.milestones, action.payload.milestone],
        },
      }

    case 'EDIT_MILESTONE':
      idx = state.currentProject.milestones.findIndex(item => item.id === action.payload.milestone.id)
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

    case 'DELETE_MILESTONE':
      idx = state.currentProject.milestones.findIndex(item => item.id === action.payload.milestone.id)
      let idx3 = state.allProjects.findIndex(item => item.id === action.payload.project.id)
      return {
        ...state,
        allProjects: [
          ...state.allProjects.slice(0, idx3),
          { ...state.allProjects[idx3], progress: action.payload.project.progress },
          ...state.allProjects.slice(idx3 + 1),
        ],
        currentProject: {
          ...state.currentProject,
          progress: action.payload.project.progress,
          milestones: [
            ...state.currentProject.milestones.slice(0, idx),
            ...state.currentProject.milestones.slice(idx + 1),
          ],
        },
      }

    case 'ADD_PROJECT':
      return {
        ...state,
        allProjects: [...state.allProjects, action.payload.project],
      }

    // case 'EDIT_PROJECT'

    // case 'DELETE_PROJECT':
    //   console.log('enters remove proj action', state)
    //   idx = state.allProjects.findIndex(proj => proj.id === action.payload)
    //   console.log('found idx: ', idx)
    //   console.log('first slice: ', state.allProjects.slice(0, idx))
    //   console.log('second slice: ', state.allProjects.slice(idx + 1))
    //   if (idx < 0) {
    //     idx = state.allProjects.length
    //   }
    //   console.log('parsed foundidx: ', idx)
    //   return {
    //     ...state,
    //     allProjects: [...state.allProjects.slice(0, idx), ...state.allProjects.slice(idx + 1)],
    //   }

    default:
      return state
  }
}
