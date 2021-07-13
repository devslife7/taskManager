const serverURL = process.env.REACT_APP_SERVER_URL
const usersURL = serverURL + '/users/'

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
