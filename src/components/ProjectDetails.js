import { Button } from "@material-ui/core"
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

  const handleDelete = () => {
    const projURL = "http://localhost:3000/projects/"

    fetch(projURL + currentProject.id, { method: "DELETE" })
      .then(resp => resp.json())
      .then(data => console.log(data))
  }

  return (
    <div style={{ backgroundColor: "white", padding: "2em", marginTop: "0.5em" }}>
      <h2>ProjectDetails page</h2>
      <div style={{ textAlign: "center" }}>
        <h2>{currentProject.name}</h2>

        <p>Description: {currentProject.description}</p>
        <p>start date: {currentProject.start_date}</p>
        <p>deadline: {currentProject.deadline}</p>
        <p>completion percentage: {currentProject.completion_percentage}</p>
        <p>created at: {currentProject.created_at}</p>
        <p>updated at: {currentProject.updated_at}</p>

        <Button variant='contained' color='primary'>
          edit
        </Button>
        <Button variant='outlined' color='primary' onClick={handleDelete}>
          delete
        </Button>
      </div>
      <Button variant='contained' color='primary'>
        Add Task
      </Button>
      {renderTasks()}
    </div>
  )
}

export default ProjectDetails
