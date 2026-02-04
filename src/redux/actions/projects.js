// Helper to simulate API delay
const simulateRequest = (data, ms = 300) => new Promise(resolve => setTimeout(() => resolve(data), ms))

export const fetchProjects = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'LOADING_PROJECT' })
    const { allProjects } = getState().projects
    simulateRequest(allProjects).then(data => {
      dispatch({ type: 'SET_ALL_PROJECTS', payload: data })
    })
  }
}

export const fetchCurrentProject = () => {
  return (dispatch, getState) => {
    const projectId = localStorage.getItem('currentProjectId')
    if (!projectId) return

    dispatch({ type: 'LOADING_PROJECT' })
    const { allProjects } = getState().projects
    const project = allProjects.find(p => p.id === parseInt(projectId))
    
    if (project) {
      simulateRequest(project).then(data => {
        dispatch({ type: 'SET_CURRENT_PROJECT', payload: data })
      })
    } else {
       // Fallback or handle not found
       dispatch({ type: 'SET_CURRENT_PROJECT', payload: { milestones: [] } })
    }
  }
}

export const clearCurrentProject = () => {
  return {
    type: 'CLEAR_CURRENT_PROJECT',
  }
}

export const addProjectFetch = requestBody => {
  return (dispatch, getState) => {
    const { allProjects } = getState().projects
    const nextId = allProjects.length > 0 ? Math.max(...allProjects.map(p => p.id)) + 1 : 1
    
    const newProject = {
      id: nextId,
      ...requestBody,
      progress: 0,
      end_date: requestBody.end_date || (Date.now() / 1000) + 86400 * 30, // Default 30 days
      milestones: []
    }

    simulateRequest(newProject).then(data => {
      dispatch({ 
        type: 'ADD_PROJECT', 
        payload: { project: data } 
      })
    })
  }
}

export const editProjectFetch = (requestBody, projectId) => {
  return (dispatch, getState) => {
    const { allProjects } = getState().projects
    const project = allProjects.find(p => p.id === parseInt(projectId))
    
    if (project) {
      const updatedProject = {
        ...project,
        ...requestBody
      }
      
      simulateRequest(updatedProject).then(data => {
        dispatch({ 
          type: 'EDIT_PROJECT', 
          payload: { project: data } 
        })
      })
    }
  }
}

export const deleteProjectFetch = projectId => {
  return dispatch => {
    simulateRequest(projectId).then(id => {
      dispatch({ 
        type: 'DELETE_PROJECT', 
        payload: { project: { id } } 
      })
    })
  }
}
