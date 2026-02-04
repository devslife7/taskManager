// Helper to simulate API delay
const simulateRequest = (data, ms = 300) => new Promise(resolve => setTimeout(() => resolve(data), ms))

export const setCurrentUser = user => {
  return {
    type: 'SET_CURRENT_USER',
    payload: user,
  }
}

export const fetchUser = () => {
  return (dispatch, getState) => {
    const { currentUser } = getState().user
    // If we want to simulate an initial fetch or login check
    // we can just return the current mock user
    simulateRequest(currentUser).then(data => {
      dispatch({ type: 'SET_CURRENT_USER', payload: data })
    })
  }
}

export const updateCurrentUser = requestBody => {
  return (dispatch, getState) => {
    const { currentUser } = getState().user
    const updatedUser = { ...currentUser, ...requestBody }

    simulateRequest(updatedUser).then(data => {
      dispatch({ type: 'SET_CURRENT_USER', payload: data })
    })
  }
}

export const logOutCurrentUser = () => {
  return {
    type: 'LOGOUT_CURRENT_USER',
  }
}

export const createReportFetch = (requestBody) => {
  return (dispatch, getState) => {
    const { currentUser } = getState().user

    const nextId = currentUser.reports && currentUser.reports.length > 0
      ? Math.max(...currentUser.reports.map(r => r.id)) + 1
      : 1

    // The requestBody likely contains title, notes, and potentially a snapshot of project
    // For demo purposes we can create a simple mock report or try to use what is passed
    const newReport = {
      id: nextId,
      created_at: new Date().toISOString(),
      ...requestBody,
      // If requestBody doesn't have project, we might need to mock one or it's just metadata
    }

    simulateRequest(newReport).then(data => {
      dispatch({ type: 'ADD_REPORT', payload: { report: data } })
    })
  }
}

export const fetchCurrentReport = reportId => {
  return (dispatch, getState) => {
    const { currentUser } = getState().user
    const report = currentUser.reports?.find(r => r.id === parseInt(reportId))

    if (report) {
      simulateRequest(report).then(data => {
        dispatch({ type: 'SET_CURRENT_REPORT', payload: data })
      })
    } else {
      // Fallback
      dispatch({ type: 'SET_CURRENT_REPORT', payload: { project: { milestones: [] } } })
    }
  }
}

export const deleteReportFetch = reportId => {
  return dispatch => {
    simulateRequest(parseInt(reportId)).then(id => {
      dispatch({
        type: 'DELETE_REPORT',
        payload: id,
      })
    })
  }
}
