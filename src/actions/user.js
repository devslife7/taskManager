import { baseURL } from "../API/config"

const usersURL = baseURL + "users/"

export const setCurrentUser = user => {
  return {
    type: "SET_CURRENT_USER",
    payload: user,
  }
}

export const fetchUser = () => {
  return dispatch => {
    fetch(usersURL + localStorage.userId)
      .then(resp => resp.json())
      .then(data => dispatch({ type: "SET_CURRENT_USER", payload: data }))
  }
}

export const logOutCurrentUser = () => {
  return {
    type: "LOGOUT_CURRENT_USER",
  }
}
