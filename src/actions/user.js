const serverURL = process.env.REACT_APP_SERVER_URL
const usersURL = serverURL + '/users/'
const reportsURL = serverURL + '/reports/'

export const setCurrentUser = user => {
  return {
    type: 'SET_CURRENT_USER',
    payload: user,
  }
}

export const fetchUser = () => {
  return dispatch => {
    fetch(usersURL + localStorage.userId)
      .then(resp => resp.json())
      .then(data => dispatch({ type: 'SET_CURRENT_USER', payload: data }))
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
  return dispatch => {
    fetch(reportsURL + reportId, { method: 'GET' })
      .then(resp => resp.json())
      .then(data => dispatch({ type: 'SET_CURRENT_REPORT', payload: data }))
  }
}
