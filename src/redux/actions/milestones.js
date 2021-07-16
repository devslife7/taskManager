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
