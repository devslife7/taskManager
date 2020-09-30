import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCurrentProject } from "../actions/projects"
import TaskCard from "./TaskCard"

function ProjectDetails() {
  const dispatch = useDispatch()
  const currentProject = useSelector(state => state.projects.currentProject)

  useEffect(() => {
    !!localStorage.currentProjectId && dispatch(fetchCurrentProject(localStorage.currentProjectId))
  }, [])

  const renderTasks = () => {
    return currentProject.tasks.map((t, idx) => <TaskCard key={idx} task={t} />)
  }
  return (
    <div>
      <h2>ProjectDetails page</h2>
      <h2>current project Name: {currentProject.name}</h2>
      {<h5>project tasks: {renderTasks()}</h5>}
    </div>
  )
}

export default ProjectDetails
