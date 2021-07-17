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

        // dispatch({
        //   type: 'UPDATE_PROJECT',
        //   payload: { project: data.project, milestone: data.milestone },
        // })
      })
  }
}
// export const createTaskFetch = requestBody => {
//   return dispatch => {
//     const postRequest = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(requestBody),
//     }

//     fetch(tasksURL, postRequest)
//       .then(resp => resp.json())
//       .then(data => data)
//       .then(data => {
//         dispatch({ type: 'ADD_TASK', payload: data })

//         dispatch({
//           type: 'UPDATE_PROJECT',
//           payload: { project: data.project, milestone: data.milestone },
//         })
//       })
//   }
// }

// export const editTaskFetch = (requestBody, taskId) => {
//   return dispatch => {
//     const configurationObject = {
//       method: 'PATCH',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(requestBody),
//     }
//     fetch(tasksURL + taskId, configurationObject)
//       .then(resp => resp.json())
//       .then(data => {
//         dispatch({
//           type: 'EDIT_TASK',
//           payload: data,
//         })
//       })
//   }
// }

// export const deleteTaskFetch = taskId => {
//   return dispatch => {
//     fetch(tasksURL + taskId, { method: 'DELETE' })
//       .then(resp => resp.json())
//       .then(data => {
//         dispatch({
//           type: 'DELETE_TASK',
//           payload: data,
//         })
//         dispatch({
//           type: 'UPDATE_PROJECT',
//           payload: { project: data.project, milestone: data.milestone },
//         })
//       })
//   }
// }
