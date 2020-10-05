import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  makeStyles,
  TextField
} from "@material-ui/core"
import React, { useState } from "react"
import OverviewGraph from "./OverviewGraph"
import AddIcon from "@material-ui/icons/Add"
import { useDispatch } from "react-redux"
import DatePicker from "./DatePicker"

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

  const [openDialog, setOpenDialog] = useState(false)

  const handleOpenDialog = () => setOpenDialog(true)
  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  return (
    <div style={{ backgroundColor: "#fafafa" }}>
      <Button
        variant='contained'
        color='secondary'
        startIcon={<AddIcon />}
        className={classes.button}
        onClick={handleOpenDialog}
      >
        Add Project
      </Button>
      <OverviewGraph />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{"Create New Project"}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id='alert-dialog-description'>
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText> */}

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
              fullWidth
              label='Description'
              value={description}
              onChange={e => {
                setDescription(e.target.value)
              }}
            />
            <DatePicker />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            className={classes.button}
            onClick={handleCloseDialog}
            color='primary'
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            className={classes.button}
            onClick={handleCloseDialog}
            color='primary'
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
