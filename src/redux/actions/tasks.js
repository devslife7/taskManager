const serverURL = process.env.REACT_APP_SERVER_URL
const tasksURL = serverURL + '/tasks/'
const entriesURL = serverURL + '/entries/'

export const fetchCurrentTask = () => {
  return dispatch => {
    dispatch({ type: 'LOADING_TASK' })

    fetch(tasksURL + localStorage.getItem('currentTaskId'))
      .then(resp => resp.json())
      .then(data => dispatch({ type: 'SET_CURRENT_TASK', payload: data }))
  }
}

export const clearCurrentTask = () => {
  return {
    type: 'CLEAR_CURRENT_TASK',
  }
}

export const createEntryFetch = requestBody => {
  return dispatch => {
    const configObject = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    }

    fetch(entriesURL, configObject)
      .then(resp => resp.json())
      .then(data => {
        console.log('DATA', data)
        dispatch({
          type: 'ADD_ENTRY',
          payload: data,
        })
        dispatch({
          type: 'UPDATE_MILESTONE',
          payload: { task: data.task, milestone: data.milestone },
        })
        dispatch({
          type: 'UPDATE_PROJECT',
          payload: { project: data.project, milestone: data.milestone },
        })
      })
  }
}

export const editEntryFetch = (requestBody, entryId) => {
  return dispatch => {
    const configObject = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    }
    fetch(entriesURL + entryId, configObject)
      .then(resp => resp.json())
      .then(data => {
        dispatch({
          type: 'EDIT_ENTRY',
          payload: data,
        })
        dispatch({
          type: 'UPDATE_MILESTONE',
          payload: { task: data.task, milestone: data.milestone },
        })
        dispatch({
          type: 'UPDATE_PROJECT',
          payload: { project: data.project, milestone: data.milestone },
        })
      })
  }
}

export const deleteEntryFetch = entryId => {
  return dispatch => {
    fetch(entriesURL + entryId, { method: 'DELETE' })
      .then(resp => resp.json())
      .then(data => {
        dispatch({
          type: 'DELETE_ENTRY',
          payload: data,
        })
        dispatch({
          type: 'UPDATE_MILESTONE',
          payload: { task: data.task, milestone: data.milestone },
        })
        dispatch({
          type: 'UPDATE_PROJECT',
          payload: { project: data.project, milestone: data.milestone },
        })
      })
  }
}

export const createTaskFetch = requestBody => {
  return dispatch => {
    const configObject = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    }

    fetch(tasksURL, configObject)
      .then(resp => resp.json())
      .then(data => data)
      .then(data => {
        dispatch({ type: 'ADD_TASK', payload: data })

        dispatch({
          type: 'UPDATE_PROJECT',
          payload: { project: data.project, milestone: data.milestone },
        })
      })
  }
}

export const editTaskFetch = (requestBody, taskId) => {
  return dispatch => {
    const configObject = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    }
    fetch(tasksURL + taskId, configObject)
      .then(resp => resp.json())
      .then(data => {
        dispatch({
          type: 'EDIT_TASK',
          payload: data,
        })
      })
  }
}

export const deleteTaskFetch = taskId => {
  return dispatch => {
    fetch(tasksURL + taskId, { method: 'DELETE' })
      .then(resp => resp.json())
      .then(data => {
        dispatch({
          type: 'DELETE_TASK',
          payload: data,
        })
        dispatch({
          type: 'UPDATE_PROJECT',
          payload: { project: data.project, milestone: data.milestone },
        })
      })
  }
}
