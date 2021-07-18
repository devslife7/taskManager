const serverURL = process.env.REACT_APP_SERVER_URL
const projectsURL = serverURL + '/projects/'

export const fetchProjects = () => {
  return dispatch => {
    dispatch({ type: 'LOADING_PROJECT' })

    fetch(projectsURL)
      .then(resp => resp.json())
      .then(data => dispatch({ type: 'SET_ALL_PROJECTS', payload: data }))
  }
}
export const fetchCurrentProject = () => {
  return dispatch => {
    // dispatch({ type: "LOADING_PROJECT" })

    fetch(projectsURL + localStorage.getItem('currentProjectId'))
      .then(resp => resp.json())
      .then(data => dispatch({ type: 'SET_CURRENT_PROJECT', payload: data }))
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
