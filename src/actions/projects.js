const projectsURL = "http://localhost:3000/projects/"

export const fetchProjects = () => {
  return dispatch => {
    dispatch({ type: "LOADING_DATA" })

    fetch(projectsURL)
      .then(resp => resp.json())
      .then(data => dispatch({ type: "SET_ALL_PROJECTS", payload: data }))
  }
}
export const fetchCurrentProject = projectId => {
  return dispatch => {
    dispatch({ type: "LOADING_DATA" })

    console.log("makes current project fetchcall")
    fetch(projectsURL + projectId)
      .then(resp => resp.json())
      .then(data => dispatch({ type: "SET_CURRENT_PROJECT", payload: data }))
  }
}
