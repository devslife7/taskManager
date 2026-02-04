const serverURL = process.env.REACT_APP_SERVER_URL
const projectsURL = serverURL ? serverURL + '/projects/' : null

export const fetchProjects = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'LOADING_PROJECT' })

    // If no server URL, use mock data from state
    if (!projectsURL) {
      const { allProjects } = getState().projects
      setTimeout(() => {
        dispatch({ type: 'SET_ALL_PROJECTS', payload: allProjects })
      }, 100)
      return
    }

    fetch(projectsURL)
      .then(resp => resp.json())
      .then(data => dispatch({ type: 'SET_ALL_PROJECTS', payload: data }))
      .catch(err => {
        console.error('Failed to fetch projects:', err)
        // Use mock data on error
        const { allProjects } = getState().projects
        dispatch({ type: 'SET_ALL_PROJECTS', payload: allProjects })
      })
  }
}
export const fetchCurrentProject = () => {
  return (dispatch, getState) => {
    const projectId = localStorage.getItem('currentProjectId')
    
    // If no server URL, use mock data from state
    if (!projectsURL) {
      const { allProjects } = getState().projects
      const project = allProjects.find(p => p.id === parseInt(projectId))
      if (project) {
        setTimeout(() => {
          dispatch({ type: 'SET_CURRENT_PROJECT', payload: project })
        }, 100)
      }
      return
    }

    fetch(projectsURL + projectId)
      .then(resp => resp.json())
      .then(data => dispatch({ type: 'SET_CURRENT_PROJECT', payload: data }))
      .catch(err => {
        console.error('Failed to fetch current project:', err)
        // Use mock data on error
        const { allProjects } = getState().projects
        const project = allProjects.find(p => p.id === parseInt(projectId))
        if (project) {
          dispatch({ type: 'SET_CURRENT_PROJECT', payload: project })
        }
      })
  }
}
export const clearCurrentProject = () => {
  return {
    type: 'CLEAR_CURRENT_PROJECT',
  }
}
export const addProjectFetch = requestBody => {
  return dispatch => {
    const configObject = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    }

    fetch(projectsURL, configObject)
      .then(resp => resp.json())
      .then(data => dispatch({ type: 'ADD_PROJECT', payload: data }))
  }
}

export const editProjectFetch = (requestBody, projectId) => {
  return dispatch => {
    const configObject = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    }

    fetch(projectsURL + projectId, configObject)
      .then(resp => resp.json())
      .then(data => dispatch({ type: 'EDIT_PROJECT', payload: data }))
  }
}

export const deleteProjectFetch = projectId => {
  return dispatch => {
    fetch(projectsURL + projectId, { method: 'DELETE' })
      .then(resp => resp.json())
      .then(data => dispatch({ type: 'DELETE_PROJECT', payload: data }))
  }
}
