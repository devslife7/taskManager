import React from "react"
import Typography from "@material-ui/core/Typography"
import Breadcrumbs from "@material-ui/core/Breadcrumbs"
import { Link } from "react-router-dom"

// function handleClick(event) {
//   event.preventDefault()
//   console.info("You clicked a breadcrumb.")
// }

export default function SimpleBreadcrumbs() {
  return (
    <>
      <Breadcrumbs aria-label='breadcrumb'>
        <Link to='/project/details'>Material-UI</Link>
        <Link to='/milestone/details'>Core</Link>
        <Typography color='textPrimary'>Breadcrumb</Typography>
      </Breadcrumbs>
    </>
  )
}
