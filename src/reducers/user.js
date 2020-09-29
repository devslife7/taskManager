const initialState = {
  currentUser: {},
  loggedIn: false
}

export default (state = initialState, action) => {
  let idx
  switch (action.type) {
    case "SET_CURRENT_USER":
      // const { id, first_name, last_name, username } = action.payload

      return {
        ...state,
        currentUser: action.payload,
        loggedIn: true
      }

    case "LOGOUT_CURRENT_USER":
      return {
        ...state,
        currentUser: {},
        loggedIn: false
      }

    case "ADD_FRIEND":
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          friends: [...state.currentUser.friends, action.payload]
        }
      }
    case "REMOVE_FRIEND":
      idx = state.currentUser.friends.findIndex(friend => friend.id === action.payload)
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          friends: [
            ...state.currentUser.friends.slice(0, idx),
            ...state.currentUser.friends.slice(idx + 1)
          ]
        }
      }

    default:
      return state
  }
}
