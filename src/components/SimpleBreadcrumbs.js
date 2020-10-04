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
    <Breadcrumbs aria-label='breadcrumb' separator={<NavigateNextIcon />}>
      <Button onClick={clearCurrentData} style={{ textDecoration: "none" }}>
        <Typography color='textPrimary'>Overview</Typography>
      </Button>
      <Button>
        <Typography color='textPrimary'>{currentProject.name}</Typography>
      </Button>
      <Button>
        <Typography color='textPrimary'>{currentMilestone.name}</Typography>
      </Button>
      <Button>
        <Typography color='textPrimary'>{currentTask.name}</Typography>
      </Button>
    </Breadcrumbs>
  )
}
