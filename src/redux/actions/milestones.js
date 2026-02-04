// Helper to simulate API delay
const simulateRequest = (data, ms = 300) => new Promise(resolve => setTimeout(() => resolve(data), ms))

export const fetchCurrentMilestone = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'LOADING_MILESTONE' })

    const milestoneId = localStorage.getItem('currentMilestoneId')
    if (!milestoneId) return

    const { currentProject } = getState().projects
    const milestone = currentProject.milestones?.find(m => m.id === parseInt(milestoneId))

    if (milestone) {
      simulateRequest(milestone).then(data => {
        dispatch({ type: 'SET_CURRENT_MILESTONE', payload: data })
      })
    } else {
      // Handle not found
      dispatch({ type: 'SET_CURRENT_MILESTONE', payload: { tasks: [] } })
    }
  }
}

export const clearCurrentMilestone = () => {
  return {
    type: 'CLEAR_CURRENT_MILESTONE',
  }
}

export const createMilestoneFetch = requestBody => {
  return (dispatch, getState) => {
    const { currentProject } = getState().projects
    if (!currentProject) return

    // Generate Mock ID
    const nextId = currentProject.milestones && currentProject.milestones.length > 0
      ? Math.max(...currentProject.milestones.map(m => m.id)) + 1
      : 1

    const newMilestone = {
      id: nextId,
      ...requestBody,
      progress: 0,
      tasks: []
    }

    // Determine project progress (mock logic or keep same)
    const updatedProject = { ...currentProject }

    simulateRequest({ project: updatedProject, milestone: newMilestone }).then(data => {
      dispatch({ type: 'ADD_MILESTONE', payload: data })
    })
  }
}

export const editMilestoneFetch = (requestBody, milestoneId) => {
  return (dispatch, getState) => {
    const { currentProject } = getState().projects
    const milestone = currentProject.milestones?.find(m => m.id === parseInt(milestoneId))

    if (milestone) {
      const updatedMilestone = { ...milestone, ...requestBody }

      simulateRequest({ milestone: updatedMilestone }).then(data => {
        dispatch({
          type: 'EDIT_MILESTONE',
          payload: data,
        })
      })
    }
  }
}

export const deleteMilestoneFetch = milestoneId => {
  return (dispatch, getState) => {
    const { currentProject } = getState().projects

    simulateRequest({ project: currentProject, milestone: { id: parseInt(milestoneId) } }).then(data => {
      dispatch({
        type: 'DELETE_MILESTONE',
        payload: data,
      })
    })
  }
}
