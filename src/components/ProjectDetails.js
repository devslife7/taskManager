import { Button, TextField } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCurrentProject, removeProject } from "../actions/projects"
import { addTask } from "../actions/tasks"
import TaskCard from "./TaskCard"

function ProjectDetails({ history }) {
  const dispatch = useDispatch()
  const currentProject = useSelector(state => state.projects.currentProject)
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState("")
  const [notes, setNotes] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [hours, setHours] = useState("")

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
      .then(data => dispatch(removeProject(data)))
    history.push("/home")
  }

  const handleAddTask = () => {
    setShowForm(!showForm)
  }

  const handleSubmit = e => {
    e.preventDefault()

    const tasksURL = "http://localhost:3000/tasks/"

    const configurationObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        task: {
          name: name,
          notes: notes,
          start_date: startDate,
          end_date: endDate,
          hours: hours,
          project_id: currentProject.id,
          completion_percentage: "0%"
        }
      })
    }

    fetch(tasksURL, configurationObj)
      .then(resp => resp.json())
      .then(data => dispatch(addTask(data)))

    setShowForm(false)
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
      <Button variant='contained' color='primary' onClick={handleAddTask}>
        Add Task
      </Button>
      {showForm && (
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            required
            label='Name'
            autoFocus
            value={name}
            onChange={e => {
              setName(e.target.value)
            }}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Notes'
            value={notes}
            onChange={e => {
              setNotes(e.target.value)
            }}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Hours'
            value={hours}
            onChange={e => {
              setHours(e.target.value)
            }}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Start Date'
            value={startDate}
            onChange={e => {
              setStartDate(e.target.value)
            }}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='End Date'
            value={endDate}
            onChange={e => {
              setEndDate(e.target.value)
            }}
          />
          <Button type='submit' fullWidth variant='contained' color='primary'>
            Submit
          </Button>
        </form>
      )}

      {renderTasks()}
    </div>
  )
}

export default ProjectDetails
