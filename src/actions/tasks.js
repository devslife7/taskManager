const tasksURL = "http://localhost:3000/tasks/"

export const fetchCurrentTask = taskId => {
  console.log("runs fetchCurrenTask action")
  return dispatch => {
    dispatch({ type: "LOADING_DATA" })

    console.log("makes current Task fetchcall")
    fetch(tasksURL + taskId)
      .then(resp => resp.json())
      .then(data => dispatch({ type: "SET_CURRENT_TASK", payload: data }))
  }
}
export const addTask = task => {
  return {
    type: "ADD_TASK",
    payload: task
  }
}
