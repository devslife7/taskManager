import { Button, makeStyles, TextField } from "@material-ui/core"
import React, { useState } from "react"
import OverviewGraph from "./OverviewGraph"
import AddIcon from "@material-ui/icons/Add"
import { useDispatch } from "react-redux"

const useStyles = makeStyles(theme => ({
  button: {
    textTransform: "none",
    margin: "5vh 0 0 10vw",
    fontSize: "1rem",
    backgroundColor: "#2b9af7"
  }
}))

export default function Overview() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  // const handleAddProject = e => {
  //   setShowForm(!showForm)
  // }

  // const handleSubmit = e => {
  //   e.preventDefault()

  //   const projURL = "http://localhost:3000/projects"

  //   const configObj = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "Application/json"
  //     },
  //     body: JSON.stringify({
  //       project: {
  //         name: name,
  //         description: description,
  //         start_date: startDate,
  //         deadline: endDate,
  //         completion_percentage: "0%"
  //       }
  //     })
  //   }

  //   fetch(projURL, configObj)
  //     .then(resp => resp.json())
  //     .then(data => dispatch(addProject(data)))

  //   setShowForm(false)
  //   setName("")
  //   setDescription("")
  //   setStartDate("")
  //   setEndDate("")
  // }

  return (
    <div style={{ backgroundColor: "#fafafa" }}>
      <Button
        variant='contained'
        color='secondary'
        startIcon={<AddIcon />}
        className={classes.button}
      >
        Add Project
      </Button>
      <OverviewGraph />

      {showForm && (
        <form noValidate>
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
    </div>
  )
}
