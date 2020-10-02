import { IconButton } from "@material-ui/core"
import React from "react"
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos"
import { useDispatch } from "react-redux"
import { fetchCurrentProject } from "../actions/projects"

function ProjectCard({ project }) {
  const dispatch = useDispatch()

  const handleSetCurrentProject = () => {
    localStorage.currentProjectId = project.id
    dispatch(fetchCurrentProject())
  }

  return (
    <div>
      <h4>
        {project.name} - ({`${project.progress}%`})
        <IconButton onClick={handleSetCurrentProject}>
          <ArrowForwardIosIcon />
        </IconButton>
      </h4>
      <p>{project.description}</p>
      <p>{project.end_date}</p>
    </div>
  )
}

export default ProjectCard
