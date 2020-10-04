import React from "react"
import Typography from "@material-ui/core/Typography"
// import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { clearCurrentProject, fetchCurrentProject } from "../actions/projects"
import { Button, IconButton, MenuItem, Select } from "@material-ui/core"
import NavigateNextIcon from "@material-ui/icons/NavigateNext"
import { clearCurrentMilestone, fetchCurrentMilestone } from "../actions/milestones"
import { clearCurrentTask, fetchCurrentTask } from "../actions/tasks"

export default function SimpleBreadcrumbs() {
  const dispatch = useDispatch()
  const allProjects = useSelector(state => state.projects.allProjects)
  const currentProject = useSelector(state => state.projects.currentProject)
  const currentMilestone = useSelector(state => state.milestones.currentMilestone)
  const currentTask = useSelector(state => state.tasks.currentTask)

  const clearProject = () => {
    dispatch(clearCurrentProject())
    dispatch(clearCurrentMilestone())
    dispatch(clearCurrentTask())
  }
  const clearMilestone = () => {
    dispatch(clearCurrentMilestone())
    dispatch(clearCurrentTask())
  }
  const clearTask = () => {
    dispatch(clearCurrentTask())
  }

  const renderMenuItems = list => {
    return list.map((item, idx) => (
      <MenuItem key={idx} value={item.id}>
        <Typography color='textPrimary' variant='subtitle1'>
          {item.name}
        </Typography>
      </MenuItem>
    ))
  }

  const handleSetCurrentProject = event => {
    localStorage.currentProjectId = event.target.value
    dispatch(fetchCurrentProject())
    clearProject()
  }
  const handleSetCurrentMilestone = event => {
    localStorage.currentMilestoneId = event.target.value
    dispatch(fetchCurrentMilestone())
    clearMilestone()
  }
  const handleSetCurrentTask = event => {
    localStorage.currentTaskId = event.target.value
    dispatch(fetchCurrentTask())
    clearTask()
  }

  return (
    <div aria-label='breadcrumb' style={{ marginBottom: "5vh" }}>
      <Button variant='outlined' onClick={clearProject}>
        <Typography color='textPrimary'>Overview</Typography>
      </Button>
      {currentProject.id && (
        <>
          <IconButton onClick={clearMilestone} style={{ margin: "0vh 0.5vw" }}>
            <NavigateNextIcon />
          </IconButton>
          <Select value={currentProject.id} onChange={handleSetCurrentProject}>
            {renderMenuItems(allProjects)}
          </Select>
        </>
      )}
      {currentMilestone.id && (
        <>
          <IconButton onClick={clearTask} style={{ margin: "0vh 0.5vw" }}>
            <NavigateNextIcon />
          </IconButton>
          <Select value={currentMilestone.id} onChange={handleSetCurrentMilestone}>
            {renderMenuItems(currentProject.milestones)}
          </Select>
        </>
      )}
      {currentTask.id && (
        <>
          <IconButton disabled onClick={clearTask} style={{ margin: "0vh 0.5vw" }}>
            <NavigateNextIcon />
          </IconButton>
          <Select value={currentTask.id} onChange={handleSetCurrentTask}>
            {renderMenuItems(currentMilestone.tasks)}
          </Select>
        </>
      )}
    </div>
  )
}
