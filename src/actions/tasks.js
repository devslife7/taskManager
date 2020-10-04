const tasksURL = "http://localhost:3000/tasks/"

export const fetchCurrentTask = () => {
  return dispatch => {
    dispatch({ type: "LOADING_TASK" })

    fetch(tasksURL + localStorage.currentTaskId)
      .then(resp => resp.json())
      .then(data => dispatch({ type: "SET_CURRENT_TASK", payload: data }))
  }
}

export const clearCurrentTask = () => {
  return {
    type: "CLEAR_CURRENT_TASK"
  }
}

export const addEntry = entry => {
  return {
    type: "ADD_ENTRY",
    payload: entry
  }
}
