import { Button, Grid, TextField } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCurrentProject } from "../actions/projects"
import { addEntry, fetchCurrentTask } from "../actions/tasks"
import EntriesCard from "./EntriesCard"

function Tasks() {
  const dispatch = useDispatch()
  const currentProject = useSelector(state => state.projects.currentProject)
  const currentTask = useSelector(state => state.tasks.currentTask)
  const currentUser = useSelector(state => state.user.currentUser)
  const [date, setDate] = useState("")
  const [notes, setNotes] = useState("")
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    !!localStorage.currentTaskId && dispatch(fetchCurrentTask(localStorage.currentTaskId))
    !!localStorage.currentProjectId && dispatch(fetchCurrentProject(localStorage.currentProjectId))
  }, [])

  const renderEntries = () => {
    return currentTask.entries.map((ent, idx) => <EntriesCard key={idx} entry={ent} />)
  }

  const handleDeleteTask = () => {
    console.log("delete task")

    const tasksURL = "http://localhost:3000/tasks/"

    fetch(tasksURL + currentTask.id, { method: "DELETE" })
      .then(resp => resp.json())
      .then(data => console.log(data))
  }

  const handleAddEntry = () => {
    console.log("add entry")
    setShowForm(!showForm)
  }

  const handleSubmit = e => {
    e.preventDefault()

    const entriesURL = "http://localhost:3000/entries/"

    const configuratinObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        entry: {
          date: date,
          notes: notes,
          completion_percentage: "0%",
          user_id: currentUser.id,
          task_id: currentTask.id
        }
      })
    }
    fetch(entriesURL, configuratinObj)
      .then(resp => resp.json())
      .then(data => dispatch(addEntry(data)))

    setShowForm(false)
  }

  return (
    <div style={{ backgroundColor: "white", padding: "2em", marginTop: "0.5em" }}>
      <h2>Task page</h2>

      <Grid container style={{ textAlign: "center" }}>
        <Grid item xs={6}>
          <h2>{currentProject.name}</h2>
          <p>Description: {currentProject.description}</p>
          <p>start date: {currentProject.start_date}</p>
          <p>deadline: {currentProject.deadline}</p>
          <p>completion percentage: {currentProject.completion_percentage}</p>
          <p>created at: {currentProject.created_at}</p>
          <p>updated at: {currentProject.updated_at}</p>
        </Grid>
        <Grid item xs={6}>
          <h1>{currentTask.name}</h1>
          <p>notes: {currentTask.notes}</p>
          <p>start date: {currentTask.start_date}</p>
          <p>end date: {currentTask.end_date}</p>
          <p>hours: {currentTask.hours}</p>
          <p>completion percentage: {currentTask.completion_percentage}</p>
          <p>created at: {currentTask.created_at}</p>
          <p>updated at: {currentTask.updated_at}</p>
          <Button variant='contained' color='primary'>
            edit
          </Button>
          <Button variant='outlined' color='primary' onClick={handleDeleteTask}>
            delete
          </Button>
        </Grid>
      </Grid>
      <Button variant='contained' color='primary' onClick={handleAddEntry}>
        Add Entry
      </Button>

      {showForm && (
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            required
            label='Date'
            autoFocus
            value={date}
            onChange={e => {
              setDate(e.target.value)
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
          <Button type='submit' fullWidth variant='contained' color='primary'>
            Submit
          </Button>
        </form>
      )}

      <h4>Tasks entries: {renderEntries()}</h4>
    </div>
  )
}

export default Tasks
