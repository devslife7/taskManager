const projectsURL = "http://localhost:3000/projects"

export const fetchProjects = () => {
  return dispatch => {
    dispatch({ type: "LOADING_PROJECTS" })

    fetch(projectsURL)
      .then(resp => resp.json())
      .then(data => dispatch({ type: "SET_ALL_PROJECTS", payload: data }))
  }
}
