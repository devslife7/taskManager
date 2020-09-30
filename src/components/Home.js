import { Button, TextField } from "@material-ui/core"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { addProject } from "../actions/projects"
import Projects from "./Projects"

function Home() {
  const dispatch = useDispatch()
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const handleAddProject = e => {
    setShowForm(!showForm)
  }

  const handleSubmit = e => {
    e.preventDefault()

    const projURL = "http://localhost:3000/projects"

    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify({
        project: {
          name: name,
          description: description,
          start_date: startDate,
          deadline: endDate,
          completion_percentage: "0%"
        }
      })
    }

    fetch(projURL, configObj)
      .then(resp => resp.json())
      .then(data => dispatch(addProject(data)))

    setShowForm(false)
    setName("")
    setDescription("")
    setStartDate("")
    setEndDate("")
  }

  return (
    <div style={{ backgroundColor: "white", padding: "2em", marginTop: "0.5em" }}>
      <h1>Home Page</h1>
      <Button variant='contained' color='primary' onClick={handleAddProject}>
        Add Project
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
            label='Description'
            value={description}
            onChange={e => {
              setDescription(e.target.value)
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

      <Projects />
    </div>
  )
}

export default Home
