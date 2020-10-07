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
  return (dispatch, getState) => {
    const {
      tasks: { currentTask },
      milestones: { currentMilestone },
    } = getState()
    const configurationObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }

    fetch(entriesURL, configurationObject)
      .then(resp => resp.json())
      .then(data => {
        dispatch({
          type: "UPDATE_CURRENT_TASK_PROGRESS",
          payload: { taskProgress: data.task_progress, entry: data.entry },
        })
        dispatch({
          type: "UPDATE_CURRENT_PROJECT_PROGRESS",
          payload: {
            milestone: currentMilestone,
            milestoneProgress: data.milestone_progress,
            projectProgress: data.project_progress,
          },
        })
        dispatch({
          type: "UPDATE_CURRENT_MILESTONE_PROGRESS",
          payload: {
            task: currentTask,
            taskProgress: data.task_progress,
            milestoneProgress: data.milestone_progress,
          },
        })
      })
  }
}

export const deleteEntryFetch = entryId => {
  return dispatch => {
    fetch(entriesURL + entryId, { method: "DELETE" })
      .then(resp => resp.json())
      .then(data => dispatch({ type: "DELETE_ENTRY", payload: data.deleted_entry_id }))
  }
}
