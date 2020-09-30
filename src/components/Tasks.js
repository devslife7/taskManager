import { Button, Grid } from "@material-ui/core"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCurrentProject } from "../actions/projects"
import { fetchCurrentTask } from "../actions/tasks"
import EntriesCard from "./EntriesCard"

function Tasks() {
  const dispatch = useDispatch()
  const currentProject = useSelector(state => state.projects.currentProject)
  const currentTask = useSelector(state => state.tasks.currentTask)

  useEffect(() => {
    !!localStorage.currentTaskId && dispatch(fetchCurrentTask(localStorage.currentTaskId))
    !!localStorage.currentProjectId && dispatch(fetchCurrentProject(localStorage.currentProjectId))
  }, [])

  const renderEntries = () => {
    return currentTask.entries.map((ent, idx) => <EntriesCard key={idx} entry={ent} />)
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
          <Button variant='outlined' color='primary'>
            delete
          </Button>
        </Grid>
      </Grid>
      <Button variant='contained' color='primary'>
        Add Entry
      </Button>

      <h4>Tasks entries: {renderEntries()}</h4>
    </div>
  )
}

export default Tasks
