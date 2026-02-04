const serverURL = process.env.REACT_APP_SERVER_URL
const milestonesURL = serverURL ? serverURL + '/milestones/' : null

export const fetchCurrentMilestone = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'LOADING_MILESTONE' })
    
    const milestoneId = localStorage.getItem('currentMilestoneId')
    
    // If no server URL, use mock data from state
    if (!milestonesURL) {
      const { currentProject } = getState().projects
      const milestone = currentProject.milestones?.find(m => m.id === parseInt(milestoneId))
      if (milestone) {
        setTimeout(() => {
          dispatch({ type: 'SET_CURRENT_MILESTONE', payload: milestone })
        }, 100)
      }
      return
    }

    fetch(milestonesURL + milestoneId)
      .then(resp => resp.json())
      .then(data => dispatch({ type: 'SET_CURRENT_MILESTONE', payload: data }))
      .catch(err => {
        console.error('Failed to fetch current milestone:', err)
        // Use mock data on error
        const { currentProject } = getState().projects
        const milestone = currentProject.milestones?.find(m => m.id === parseInt(milestoneId))
        if (milestone) {
          dispatch({ type: 'SET_CURRENT_MILESTONE', payload: milestone })
        }
      })
  }
}
export const clearCurrentMilestone = () => {
  return {
    type: 'CLEAR_CURRENT_MILESTONE',
  }
}

export const createMilestoneFetch = requestBody => {
  return dispatch => {
    const configObject = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    }

    fetch(milestonesURL, configObject)
      .then(resp => resp.json())
      .then(data => data)
      .then(data => {
        dispatch({ type: 'ADD_MILESTONE', payload: data })
      })
  }
}

export const editMilestoneFetch = (requestBody, milestoneId) => {
  return dispatch => {
    const configObject = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    }
    fetch(milestonesURL + milestoneId, configObject)
      .then(resp => resp.json())
      .then(data => {
        dispatch({
          type: 'EDIT_MILESTONE',
          payload: data,
        })
      })
  }
}

export const deleteMilestoneFetch = milestoneId => {
  return dispatch => {
    fetch(milestonesURL + milestoneId, { method: 'DELETE' })
      .then(resp => resp.json())
      .then(data => {
        dispatch({
          type: 'DELETE_MILESTONE',
          payload: data,
        })
      })
  }
}
