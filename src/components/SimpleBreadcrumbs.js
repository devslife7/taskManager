import React from "react"
import Typography from "@material-ui/core/Typography"
import Breadcrumbs from "@material-ui/core/Breadcrumbs"
// import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { clearCurrentProject } from "../actions/projects"
import { Button, Link } from "@material-ui/core"
import NavigateNextIcon from "@material-ui/icons/NavigateNext"
import { clearCurrentMilestone } from "../actions/milestones"
import { clearCurrentTask } from "../actions/tasks"

export default function SimpleBreadcrumbs() {
  const dispatch = useDispatch()
  const currentProject = useSelector(state => state.projects.currentProject)
  const currentMilestone = useSelector(state => state.milestones.currentMilestone)
  const currentTask = useSelector(state => state.tasks.currentTask)

  const clearCurrentData = () => {
    dispatch(clearCurrentProject())
    dispatch(clearCurrentMilestone())
    dispatch(clearCurrentTask())
  }

  return (
    <Breadcrumbs
      aria-label='breadcrumb'
      separator={<NavigateNextIcon />}
      style={{ marginBottom: "5vh" }}
    >
      <Button variant='outlined' onClick={clearCurrentData} style={{ textDecoration: "none" }}>
        <Typography color='textPrimary'>Overview</Typography>
      </Button>
      {currentProject.id && (
        <Button>
          <Typography color='textPrimary'>{currentProject.name}</Typography>
        </Button>
      )}
      {currentMilestone.id && (
        <Button>
          <Typography color='textPrimary'>{currentMilestone.name}</Typography>
        </Button>
      )}
      {currentTask.id && (
        <Button>
          <Typography color='textPrimary'>{currentTask.name}</Typography>
        </Button>
      )}
    </Breadcrumbs>
  )
}
