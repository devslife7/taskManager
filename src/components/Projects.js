import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProjects } from "../actions/projects"
import ProjectCard from "./ProjectCard"

function Projects() {
  const dispatch = useDispatch()
  const projects = useSelector(state => state.projects.allProjects)

  useEffect(() => {
    console.log("project page did mount")
    dispatch(fetchProjects())
  }, [dispatch])

  const renderProjects = () => {
    return projects.map((proj, idx) => <ProjectCard key={idx} project={proj} />)
  }
  return (
    <div>
      <h3>Projects page</h3>
      {renderProjects()}
    </div>
  )
}

export default Projects
