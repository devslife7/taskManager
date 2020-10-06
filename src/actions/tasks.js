const tasksURL = "http://localhost:3000/tasks/"
const entriesURL = "http://localhost:3000/entries/"

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
    type: "CLEAR_CURRENT_TASK",
  }
}

export const createEntryFetch = requestBody => {
  return dispatch => {
    const configurationObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }

    fetch(entriesURL, configurationObject)
      .then(resp => resp.json())
      .then(data => console.log(data))
    // type: "CREATE_ENTRY_FETCH",
    // payload: requestBody,
  }
}
