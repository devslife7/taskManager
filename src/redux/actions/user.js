const serverURL = process.env.REACT_APP_SERVER_URL
const usersURL = serverURL ? serverURL + '/users/' : null
const reportsURL = serverURL ? serverURL + '/reports/' : null

export const setCurrentUser = user => {
  return {
    type: 'SET_CURRENT_USER',
    payload: user,
  }
}

export const fetchUser = () => {
  return (dispatch, getState) => {
    // If no server URL, use mock data from state
    if (!usersURL) {
      const { currentUser } = getState().user
      setTimeout(() => {
        dispatch({ type: 'SET_CURRENT_USER', payload: currentUser })
      }, 100)
      return
    }
    
    fetch(usersURL + localStorage.userId)
      .then(resp => resp.json())
      .then(data => dispatch({ type: 'SET_CURRENT_USER', payload: data }))
      .catch(err => {
        console.error('Failed to fetch user:', err)
        // Use mock data on error
        const { currentUser } = getState().user
        dispatch({ type: 'SET_CURRENT_USER', payload: currentUser })
      })
  }
}

export const updateCurrentUser = requestBody => {
  return dispatch => {
    const patchRequest = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    }

    fetch(usersURL + localStorage.userId, patchRequest)
      .then(resp => resp.json())
      .then(data => {
        dispatch({ type: 'SET_CURRENT_USER', payload: data })
      })
  }
}

export const logOutCurrentUser = () => {
  return {
    type: 'LOGOUT_CURRENT_USER',
  }
}

export const createReportFetch = requestBody => {
  return dispatch => {
    const patchRequest = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    }

    fetch(reportsURL, patchRequest)
      .then(resp => resp.json())
      .then(data => {
        dispatch({ type: 'ADD_REPORT', payload: data })
      })
  }
}

export const fetchCurrentReport = reportId => {
  return (dispatch, getState) => {
    // If no server URL, use mock data from state
    if (!reportsURL) {
      const { currentUser } = getState().user
      const report = currentUser.reports?.find(r => r.id === reportId)
      if (report) {
        setTimeout(() => {
          dispatch({ type: 'SET_CURRENT_REPORT', payload: report })
        }, 100)
      }
      return
    }
    
    fetch(reportsURL + reportId, { method: 'GET' })
      .then(resp => resp.json())
      .then(data => dispatch({ type: 'SET_CURRENT_REPORT', payload: data }))
      .catch(err => {
        console.error('Failed to fetch current report:', err)
        // Use mock data on error
        const { currentUser } = getState().user
        const report = currentUser.reports?.find(r => r.id === reportId)
        if (report) {
          dispatch({ type: 'SET_CURRENT_REPORT', payload: report })
        }
      })
  }
}

export const deleteReportFetch = reportId => {
  return dispatch => {
    fetch(reportsURL + reportId, { method: 'DELETE' })
      .then(resp => resp.json())
      .then(data =>
        dispatch({
          type: 'DELETE_REPORT',
          payload: data.deletedReportId,
        })
      )
  }
}
