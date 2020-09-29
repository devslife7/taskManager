const usersURL = "http://localhost:3000/users/"

export const setCurrentUser = user => {
  return {
    type: "SET_CURRENT_USER",
    payload: user
  }
}

export const fetchUser = userId => {
  console.log("runs fetchuser action")
  return dispatch => {
    fetch(usersURL + userId)
      .then(resp => resp.json())
      .then(data => dispatch({ type: "SET_CURRENT_USER", payload: data }))
  }
}

export const logOutCurrentUser = () => {
  return {
    type: "LOGOUT_CURRENT_USER"
  }
}

export const fetchRemoveInv = invitationId => {
  const user_invitationURL = "http://localhost:3000/user_invitations/remove"
  return (dispatch, getState) => {
    const userId = getState().user.currentUser.id

    const postRequest = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: userId,
        invitation_id: invitationId
      })
    }

    fetch(user_invitationURL, postRequest)
      .then(resp => resp.json())
      .then(() => dispatch({ type: "REMOVE_INVITATION", payload: invitationId }))
  }
}
