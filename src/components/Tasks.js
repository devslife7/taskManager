import { Button, Grid, IconButton, TextField } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCurrentProject } from "../actions/projects"
import { addEntry, fetchCurrentTask } from "../actions/tasks"
import EntriesCard from "./EntriesCard"
import EntriesTable from "./EntriesTable"
import TasksTable from "./TasksTable"
import CreateIcon from "@material-ui/icons/Create"
import { fetchCurrentMilestone } from "../actions/milestones"
import AddIcon from "@material-ui/icons/Add"

function Tasks() {
  const dispatch = useDispatch()
  const currentProject = useSelector(state => state.projects.currentProject)
  const currentTask = useSelector(state => state.tasks.currentTask)
  const currentUser = useSelector(state => state.user.currentUser)
  const [date, setDate] = useState("")
  const [notes, setNotes] = useState("")
  const [completionPercentage, setCompletionPercentage] = useState("")
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    !!localStorage.currentMilestoneId && dispatch(fetchCurrentMilestone())
  }, [dispatch])

  // const renderEntries = () => {
  //   return currentTask.entries.map((ent, idx) => <EntriesCard key={idx} entry={ent} />).reverse()
  // }

  // const handleDeleteTask = () => {
  //   console.log("delete task")

  //   const tasksURL = "http://localhost:3000/tasks/"

  //   fetch(tasksURL + currentTask.id, { method: "DELETE" })
  //     .then(resp => resp.json())
  //     .then(data => console.log(data))
  // }

  const handleAddEntry = () => {
    console.log("add entry")
    setShowForm(!showForm)
  }

  // const handleSubmit = e => {
  //   e.preventDefault()

  //   const entriesURL = "http://localhost:3000/entries/"

  //   const configuratinObj = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       entry: {
  //         date: date,
  //         notes: notes,
  //         completion_percentage: completionPercentage,
  //         user_id: currentUser.id,
  //         task_id: currentTask.id
  //       }
  //     })
  //   }
  //   fetch(entriesURL, configuratinObj)
  //     .then(resp => resp.json())
  //     .then(data => dispatch(addEntry(data)))

  //   setShowForm(false)
  // }

  const currentMilestone = useSelector(state => state.milestones.currentMilestone)

  return (
    <div>
      {!!currentMilestone.id ? (
        <>
          <h2>
            {currentMilestone.name} ({`${currentMilestone.progress}%`})
            <IconButton onClick={handleAddEntry}>
              <CreateIcon fontSize='small' />
            </IconButton>
          </h2>

          {showForm && (
            <form noValidate>
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
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                label='Progress %'
                value={completionPercentage}
                onChange={e => {
                  setCompletionPercentage(e.target.value)
                }}
              />
              <Button type='submit' fullWidth variant='contained' color='primary'>
                Submit
              </Button>
            </form>
          )}

          <p>hours: {currentMilestone.hours}</p>
          <p>
            {currentMilestone.start_date} - {currentMilestone.end_date}
          </p>

          <br />
          <br />
          <span style={{ fontSize: "1.5rem" }}>Tasks</span>
          <IconButton>
            <AddIcon style={{ color: "green" }} />
          </IconButton>
          <br />
          <br />
          <TasksTable />
        </>
      ) : (
        <div>{"Select a Milestone"}</div>
      )}
    </div>
  )
}

export default Tasks
