import React from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { fetchCurrentProject } from "../actions/projects"

function ProjectCard({ project }) {
  const dispatch = useDispatch()

  const handleLink = () => {
    console.log("handles links")
    dispatch(fetchCurrentProject(project.id))
  }
  return (
    <div>
      <h1>{project.name}</h1>
      <p>Description: {project.description}</p>
      <p>start date: {project.start_date}</p>
      <p>deadline: {project.deadline}</p>
      <p>completion percentage: {project.completion_percentage}</p>
      <p>created at: {project.created_at}</p>
      <p>updated at: {project.updated_at}</p>
      <Link to='/tasks' onClick={handleLink}>
        details
      </Link>
    </div>
  )
}

export default ProjectCard
