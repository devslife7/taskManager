import { IconButton } from "@material-ui/core"
import React from "react"
import { Link } from "react-router-dom"
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos"

function ProjectCard({ project }) {
  // const handleLink = () => {
  //   localStorage.currentProjectId = project.id
  // }

  return (
    <div>
      <h3>
        {project.name} - ({`${project.progress}%`})
        <IconButton>
          <ArrowForwardIosIcon />
        </IconButton>
      </h3>
      <p>{project.description}</p>
      <p>{project.end_date}</p>
    </div>
  )
}

export default ProjectCard
