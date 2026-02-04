const initialState = {
  currentUser: {
    id: 1,
    username: 'dev_user',
    first_name: 'Dev',
    last_name: 'User',
    email: 'dev@example.com',
    role: 'developer',
    reports: [
      {
        id: 1,
        title: 'Q4 2025 Progress Report',
        created_at: '2025-12-15T10:30:00.000Z',
        project: {
          id: 1,
          name: 'Website Redesign',
          start_date: Math.floor(new Date('2025-11-01').getTime() / 1000),
          end_date: Math.floor(new Date('2026-01-30').getTime() / 1000),
          progress: 65,
          updated_at: '2025-12-15T10:30:00.000Z',
          created_at: '2025-11-01T08:00:00.000Z',
          milestones: [
            {
              id: 1,
              name: 'UI/UX Design',
              progress: 100,
              hours: 40
            },
            {
              id: 2,
              name: 'Frontend Development',
              progress: 70,
              hours: 80
            },
            {
              id: 3,
              name: 'Testing & Launch',
              progress: 20,
              hours: 40
            }
          ]
        }
      },
      {
        id: 2,
        title: 'Mobile App Sprint Review',
        created_at: '2025-12-20T14:15:00.000Z',
        project: {
          id: 2,
          name: 'Mobile App Development',
          start_date: Math.floor(new Date('2025-11-15').getTime() / 1000),
          end_date: Math.floor(new Date('2026-02-28').getTime() / 1000),
          progress: 45,
          updated_at: '2025-12-20T14:15:00.000Z',
          created_at: '2025-11-15T09:00:00.000Z',
          milestones: [
            {
              id: 4,
              name: 'Backend API',
              progress: 80,
              hours: 60
            },
            {
              id: 5,
              name: 'Mobile UI',
              progress: 30,
              hours: 70
            }
          ]
        }
      },
      {
        id: 3,
        title: 'Marketing Campaign Results',
        created_at: '2025-11-25T16:45:00.000Z',
        project: {
          id: 3,
          name: 'Marketing Campaign',
          start_date: Math.floor(new Date('2025-10-01').getTime() / 1000),
          end_date: Math.floor(new Date('2025-11-20').getTime() / 1000),
          progress: 100,
          updated_at: '2025-11-25T16:45:00.000Z',
          created_at: '2025-10-01T08:00:00.000Z',
          milestones: [
            {
              id: 6,
              name: 'Content Creation',
              progress: 100,
              hours: 50
            },
            {
              id: 7,
              name: 'Campaign Launch',
              progress: 100,
              hours: 30
            }
          ]
        }
      }
    ],
  },
  currentReport: {
    project: {
      start_date: 0,
      end_date: 0,
      updated_at: '2000-01-01T00:00:00',
      created_at: '2000-01-01T00:00:00',
      milestones: [],
    },
    created_at: '2000-01-01T00:00:00',
  },
  loggedIn: true,
}

const userReducer = (state = initialState, action) => {
  let idx
  console.log('ACTION:', action) // consoles the redux action for every action called in state

  switch (action.type) {
    case 'SET_CURRENT_USER':
      localStorage.userId = action.payload.id
      return {
        ...state,
        currentUser: action.payload,
        loggedIn: true,
      }

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

export default userReducer
