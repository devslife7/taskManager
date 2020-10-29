import { baseURL } from "../API/config"

const usersURL = baseURL + "users/"

export const setCurrentUser = user => {
  return {
    type: "SET_CURRENT_USER",
    payload: user,
  }
}

// cannot do this because of snackbars
// export const loginUser = (requestBody, history) => {
//   return dispatch => {

//     fetch(logInURL, requestBody)
//     .then(resp => resp.json())
//     .then(data => {
//       // if (data.error) {
//       //   openSnackBar()
//       // } else {
//       localStorage.token = data.token
//       localStorage.userId = data.user.id
//       console.log("this is the data.user from fetch: ", data.user)
//       dispatch({ type: "SET_CURRENT_USER", payload: data.user})
//       history.push("/dashboard")
//       // }
//     })
//   }
// }

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
