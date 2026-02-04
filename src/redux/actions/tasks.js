const serverURL = process.env.REACT_APP_SERVER_URL
const tasksURL = serverURL ? serverURL + '/tasks/' : null
const entriesURL = serverURL ? serverURL + '/entries/' : null

export const fetchCurrentTask = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'LOADING_TASK' })
    
    const taskId = localStorage.getItem('currentTaskId')
    
    // If no server URL, use mock data from state
    if (!tasksURL) {
      const { currentMilestone } = getState().milestones
      const task = currentMilestone.tasks?.find(t => t.id === parseInt(taskId))
      if (task) {
        setTimeout(() => {
          dispatch({ type: 'SET_CURRENT_TASK', payload: task })
        }, 100)
      }
      return
    }

    fetch(tasksURL + taskId)
      .then(resp => resp.json())
      .then(data => dispatch({ type: 'SET_CURRENT_TASK', payload: data }))
      .catch(err => {
        console.error('Failed to fetch current task:', err)
        // Use mock data on error
        const { currentMilestone } = getState().milestones
        const task = currentMilestone.tasks?.find(t => t.id === parseInt(taskId))
        if (task) {
          dispatch({ type: 'SET_CURRENT_TASK', payload: task })
        }
      })
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
