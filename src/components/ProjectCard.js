import React from "react"
import { Link } from "react-router-dom"

function ProjectCard({ project }) {
  const handleLink = () => {
    localStorage.currentProjectId = project.id
  }

  return (
    <div>
      <h2>
        {project.name} - ({project.completion_percentage})
      </h2>
      <p>Description: {project.description}</p>
      {/* <p>start date: {project.start_date}</p> */}
      <p>deadline: {project.deadline}</p>
      {/* <p>created at: {project.created_at}</p>
      <p>updated at: {project.updated_at}</p> */}
      <Link to='/project/details' onClick={handleLink}>
        details
      </Link>
    </div>
  )
}

export default ProjectCard
