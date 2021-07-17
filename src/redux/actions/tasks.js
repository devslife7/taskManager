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
    const configurationObject = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    }

    fetch(entriesURL, configurationObject)
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
    const configurationObject = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    }
    fetch(entriesURL + entryId, configurationObject)
      .then(resp => resp.json())
      .then(data => {
        dispatch({
          type: 'UPDATE_TASK',
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
          type: 'UPDATE_CURRENT_TASK_PROGRESS',
          payload: { taskProgress: data.task.progress },
        })
        dispatch({
          type: 'UPDATE_CURRENT_MILESTONE_TASK',
          payload: { task: data.task },
        })
        dispatch({
          type: 'UPDATE_CURRENT_MILESTONE_PROGRESS',
          payload: { milestoneProgress: data.milestone.progress },
        })
        dispatch({
          type: 'UPDATE_ALLPROJECTS_PROGRESS',
          payload: { project: data.project },
        })
        dispatch({
          type: 'UPDATE_CURRENT_PROJECT_MILESTONE',
          payload: { milestone: data.milestone },
        })
        dispatch({
          type: 'UPDATE_CURRENT_PROJECT_PROGRESS',
          payload: { projectProgress: data.project.progress },
        })
      })
  }
}

export const createTaskFetch = requestBody => {
  return dispatch => {
    const postRequest = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    }

    fetch(tasksURL, postRequest)
      .then(resp => resp.json())
      .then(data => data)
      .then(data => dispatch({ type: 'ADD_TASK', payload: data }))
  }
}
