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
export const addProject = project => {
  return {
    type: 'ADD_PROJECT',
    payload: project,
  }
}
export const removeProject = projectId => {
  return {
    type: 'REMOVE_PROJECT',
    payload: projectId,
  }
}
