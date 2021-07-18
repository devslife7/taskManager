const serverURL = process.env.REACT_APP_SERVER_URL
const milestonesURL = serverURL + '/milestones/'

export const fetchCurrentMilestone = () => {
  return dispatch => {
    dispatch({ type: 'LOADING_MILESTONE' })

    fetch(milestonesURL + localStorage.getItem('currentMilestoneId'))
      .then(resp => resp.json())
      .then(data => dispatch({ type: 'SET_CURRENT_MILESTONE', payload: data }))
  }
}
export const clearCurrentMilestone = () => {
  return {
    type: 'CLEAR_CURRENT_MILESTONE',
  }
}

export const createMilestoneFetch = requestBody => {
  return dispatch => {
    const postRequest = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    }

    fetch(milestonesURL, postRequest)
      .then(resp => resp.json())
      .then(data => data)
      .then(data => {
        dispatch({ type: 'ADD_MILESTONE', payload: data })
      })
  }
}

export const editMilestoneFetch = (requestBody, milestoneId) => {
  return dispatch => {
    const configurationObject = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    }
    fetch(milestonesURL + milestoneId, configurationObject)
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
