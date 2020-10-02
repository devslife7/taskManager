const tasksURL = "http://localhost:3000/tasks/"

export const fetchCurrentTask = () => {
  console.log("runs fetchCurrenTask action")
  return dispatch => {
    dispatch({ type: "LOADING_TASK" })

    console.log("makes current Task fetchcall")
    fetch(tasksURL + localStorage.currentTaskId)
      .then(resp => resp.json())
      .then(data => dispatch({ type: "SET_CURRENT_TASK", payload: data }))
  }
}
export const addEntry = entry => {
  console.log("enter addEntry action")
  return {
    type: "ADD_ENTRY",
    payload: entry
  }
}
