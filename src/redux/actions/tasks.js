// Helper to simulate API delay
const simulateRequest = (data, ms = 300) => new Promise(resolve => setTimeout(() => resolve(data), ms))

export const fetchCurrentTask = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'LOADING_TASK' })

    const taskId = localStorage.getItem('currentTaskId')
    if (!taskId) return

    const { currentMilestone } = getState().milestones
    const task = currentMilestone.tasks?.find(t => t.id === parseInt(taskId))

    if (task) {
      simulateRequest(task).then(data => {
        dispatch({ type: 'SET_CURRENT_TASK', payload: data })
      })
    } else {
      // Fallback
      dispatch({ type: 'SET_CURRENT_TASK', payload: { entries: [] } })
    }
  }
}

export const clearCurrentTask = () => {
  return {
    type: 'CLEAR_CURRENT_TASK',
  }
}

export const createEntryFetch = requestBody => {
  return (dispatch, getState) => {
    const { currentTask } = getState().tasks
    const { currentMilestone } = getState().milestones
    const { currentProject } = getState().projects

    if (!currentTask) return

    const nextId = currentTask.entries && currentTask.entries.length > 0
      ? Math.max(...currentTask.entries.map(e => e.id)) + 1
      : 1

    const newEntry = {
      id: nextId,
      ...requestBody,
      date: Math.floor(Date.now() / 1000)
    }

    // Mock updates
    const updatedTask = { ...currentTask, entries: [...(currentTask.entries || []), newEntry] }
    const updatedMilestone = { ...currentMilestone } // ideally update progress
    const updatedProject = { ...currentProject } // ideally update progress

    simulateRequest({
      entry: newEntry,
      task: updatedTask,
      milestone: updatedMilestone,
      project: updatedProject
    }).then(data => {
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
  return (dispatch, getState) => {
    const { currentTask } = getState().tasks
    const { currentMilestone } = getState().milestones
    const { currentProject } = getState().projects

    const entry = currentTask.entries?.find(e => e.id === parseInt(entryId))

    if (entry) {
      const updatedEntry = { ...entry, ...requestBody }
      const updatedTask = { ...currentTask } // Mock update
      const updatedMilestone = { ...currentMilestone }
      const updatedProject = { ...currentProject }

      simulateRequest({
        entry: updatedEntry,
        task: updatedTask,
        milestone: updatedMilestone,
        project: updatedProject
      }).then(data => {
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
}

export const deleteEntryFetch = entryId => {
  return (dispatch, getState) => {
    const { currentTask } = getState().tasks
    const { currentMilestone } = getState().milestones
    const { currentProject } = getState().projects

    const updatedTask = { ...currentTask }
    const updatedMilestone = { ...currentMilestone }
    const updatedProject = { ...currentProject }

    simulateRequest({
      entry_id: parseInt(entryId),
      task: updatedTask,
      milestone: updatedMilestone,
      project: updatedProject
    }).then(data => {
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
  return (dispatch, getState) => {
    const { currentMilestone } = getState().milestones
    const { currentProject } = getState().projects

    if (!currentMilestone) return

    const nextId = currentMilestone.tasks && currentMilestone.tasks.length > 0
      ? Math.max(...currentMilestone.tasks.map(t => t.id)) + 1
      : 1

    const newTask = {
      id: nextId,
      ...requestBody,
      progress: 0,
      entries: []
    }

    const updatedMilestone = { ...currentMilestone }
    const updatedProject = { ...currentProject }

    simulateRequest({
      task: newTask,
      milestone: updatedMilestone,
      project: updatedProject
    }).then(data => {
      dispatch({ type: 'ADD_TASK', payload: data })

      dispatch({
        type: 'UPDATE_PROJECT',
        payload: { project: data.project, milestone: data.milestone },
      })
    })
  }
}

export const editTaskFetch = (requestBody, taskId) => {
  return (dispatch, getState) => {
    const { currentMilestone } = getState().milestones
    const task = currentMilestone.tasks?.find(t => t.id === parseInt(taskId))

    if (task) {
      const updatedTask = { ...task, ...requestBody }

      simulateRequest({ task: updatedTask }).then(data => {
        dispatch({
          type: 'EDIT_TASK',
          payload: data,
        })
      })
    }
  }
}

export const deleteTaskFetch = taskId => {
  return (dispatch, getState) => {
    const { currentMilestone } = getState().milestones
    const { currentProject } = getState().projects

    const updatedMilestone = { ...currentMilestone }
    const updatedProject = { ...currentProject }

    simulateRequest({
      task: { id: parseInt(taskId) },
      milestone: updatedMilestone,
      project: updatedProject
    }).then(data => {
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
