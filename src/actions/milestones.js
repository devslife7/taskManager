const milestonesURL = "http://localhost:3000/milestones/"

export const fetchCurrentMilestone = () => {
  return dispatch => {
    dispatch({ type: "LOADING_MILESTONE" })

    fetch(milestonesURL + localStorage.currentMilestoneId)
      .then(resp => resp.json())
      .then(data => dispatch({ type: "SET_CURRENT_MILESTONE", payload: data }))
  }
}
export const clearCurrentMilestone = () => {
  return {
    type: "CLEAR_CURRENT_MILESTONE"
  }
}
