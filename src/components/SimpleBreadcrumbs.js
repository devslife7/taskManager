import React from "react"
import Typography from "@material-ui/core/Typography"
import Breadcrumbs from "@material-ui/core/Breadcrumbs"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"

export default function SimpleBreadcrumbs() {
  const dispatch = useDispatch()

  const clearCurrentProject = () => {
    // dispatch(clearCurrentProject())
  }

  return (
    <>
      <Breadcrumbs aria-label='breadcrumb'>
        <Link onClick={clearCurrentProject}>Overview</Link>
        <Link to='/milestone/details'>Core</Link>
        <Typography color='textPrimary'>Breadcrumb</Typography>
      </Breadcrumbs>
    </>
  )
}
