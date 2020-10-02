const projectsURL = "http://localhost:3000/projects/"

export const fetchProjects = () => {
  return dispatch => {
    dispatch({ type: "LOADING_DATA" })

    fetch(projectsURL)
      .then(resp => resp.json())
      .then(data => dispatch({ type: "SET_ALL_PROJECTS", payload: data }))
  }
}
export const fetchCurrentProject = () => {
  return dispatch => {
    dispatch({ type: "LOADING_DATA" })

    fetch(projectsURL + localStorage.currentProjectId)
      .then(resp => resp.json())
      .then(data => dispatch({ type: "SET_CURRENT_PROJECT", payload: data }))
  }
}
export const addProject = project => {
  return {
    type: "ADD_PROJECT",
    payload: project
  }
}
export const removeProject = projectId => {
  return {
    type: "REMOVE_PROJECT",
    payload: projectId
  }
}
export const addTask = task => {
  return {
    type: "ADD_TASK",
    payload: task
  }
}
