const initialState = {
  currentUser: {
    reports: [],
  },
  currentReport: {
    project: {
      start_date: 0,
      end_date: 0,
      updated_at: '2000-01-01T00:00:00',
      created_at: '2000-01-01T00:00:00',
    },
    created_at: '2000-01-01T00:00:00',
  },
  loggedIn: false,
}

export default (state = initialState, action) => {
  let idx
  console.log('ACTION:', action)

  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload,
        loggedIn: true,
      }

    // case "LOGIN_USER":
    //   return {
    //     ...state
    //   }

    case 'LOGOUT_CURRENT_USER':
      localStorage.clear()
      return {
        ...state,
        currentUser: {},
        loggedIn: false,
      }

    case 'ADD_FRIEND':
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          friends: [...state.currentUser.friends, action.payload],
        },
      }

    case 'REMOVE_FRIEND':
      idx = state.currentUser.friends.findIndex(friend => friend.id === action.payload)
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          friends: [...state.currentUser.friends.slice(0, idx), ...state.currentUser.friends.slice(idx + 1)],
        },
      }

    case 'ADD_REPORT':
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          reports: [...state.currentUser.reports, action.payload.report],
        },
      }

    case 'SET_CURRENT_REPORT':
      return {
        ...state,
        currentReport: action.payload,
      }

    case 'DELETE_REPORT':
      idx = state.currentUser.reports.findIndex(report => report.id === action.payload)
      console.log('payload: ', action.payload)
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          reports: [...state.currentUser.reports.slice(0, idx), ...state.currentUser.reports.slice(idx + 1)],
        },
      }

    default:
      return state
  }
}
