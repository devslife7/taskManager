import { Button, TextField } from "@material-ui/core"
import React, { useState } from "react"
import Projects from "./Projects"

function Home() {
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const handleAddProject = e => {
    setShowForm(true)
  }

  const handleSubmit = e => {
    e.preventDefault()
    setShowForm(false)
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
            // onChange={e => {
            //   setUsername(e.target.value)
            // }}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Description'
            value={description}
            // onChange={e => {
            //   setPassword(e.target.value)
            // }}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Start Date'
            value={startDate}
            // onChange={e => {
            //   setPassword(e.target.value)
            // }}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='End Date'
            value={endDate}
            // onChange={e => {
            //   setPassword(e.target.value)
            // }}
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
