import React from "react"
import Typography from "@material-ui/core/Typography"
import Breadcrumbs from "@material-ui/core/Breadcrumbs"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { clearCurrentProject } from "../actions/projects"

export default function SimpleBreadcrumbs() {
  const dispatch = useDispatch()
  const currentProject = useSelector(state => state.projects.currentProject)

  const clearProject = () => {
    dispatch(clearCurrentProject())
  }

  return (
    <>
      <Breadcrumbs aria-label='breadcrumb'>
        <Link onClick={clearProject}>Overview</Link>
        {/* <Link to='/milestone/details'>Core</Link> */}
        <Typography color='textPrimary'>{currentProject.name}</Typography>
      </Breadcrumbs>
    </>
  )
}
