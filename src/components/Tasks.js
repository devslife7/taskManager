import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import TasksTable from "./TasksTable"
import AddIcon from "@material-ui/icons/Add"
import TasksGraph from "./TasksGraph"
import { fromUnixTime, format } from "date-fns"
import DateFnsUtils from "@date-io/date-fns"
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"

const useStyles = makeStyles(theme => ({
  button: {
    textTransform: "none",
    color: "white",
    fontSize: "1rem",
    marginLeft: "10vw",
    marginTop: "2vh",
  },
  KeyboardDatePicker: {
    width: "140px",
  },
  DialogContent: {
    height: "350px",
    width: "350px",
  },
}))

function Tasks() {
  const classes = useStyles()
  // const dispatch = useDispatch()
  const currentMilestone = useSelector(state => state.milestones.currentMilestone)

  const [openDialog, setOpenDialog] = useState(false)
  const [name, setName] = useState("")
  const [hours, setHours] = useState("")
  const [notes, setNotes] = useState("")
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const handleOpenDialog = () => setOpenDialog(true)
  const handleCloseDialog = () => setOpenDialog(false)
  const handleSetStartDate = date => setStartDate(date)
  const handleSetEndDate = date => setEndDate(date)

  const handleDialogSubmit = () => console.log("submited dialog")

  // const handleDeleteTask = () => {
  //   console.log("delete task")

  //   const tasksURL = "http://localhost:3000/tasks/"

  //   fetch(tasksURL + currentTask.id, { method: "DELETE" })
  //     .then(resp => resp.json())
  //     .then(data => console.log(data))
  // }

  // const handleAddEntry = () => {
  //   console.log("add entry")
  //   setShowForm(!showForm)
  // }

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

  return (
    <div style={{ padding: "0 50px", height: "90vh", overflow: "scroll" }}>
      <Typography variant='subtitle1' align='center'>
        {format(fromUnixTime(currentMilestone.start_date), "PP")} -{" "}
        {format(fromUnixTime(currentMilestone.end_date), "PP")}
      </Typography>
      <Typography variant='subtitle1' align='center'>{`Progress: ${currentMilestone.progress}%`}</Typography>
      <Typography variant='subtitle1' align='center'>{`Hours: ${currentMilestone.hours}`}</Typography>

      <Button
        variant='contained'
        color='primary'
        startIcon={<AddIcon />}
        className={classes.button}
        onClick={handleOpenDialog}>
        Add Task
      </Button>

      <TasksTable />
      <TasksGraph />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <Typography variant='h5' style={{ marginTop: "20px", marginLeft: "20px" }}>
          {"New Task"}
        </Typography>

        <DialogContent className={classes.DialogContent}>
          <TextField
            label='Name'
            variant='outlined'
            margin='normal'
            fullWidth
            value={name}
            onChange={e => {
              setName(e.target.value)
            }}
          />
          <TextField
            label='Hours'
            variant='outlined'
            margin='normal'
            fullWidth
            value={hours}
            onChange={e => {
              setHours(e.target.value)
            }}
          />
          <TextField
            label='Notes'
            variant='outlined'
            margin='normal'
            fullWidth
            multiline
            rows={2}
            value={notes}
            onChange={e => {
              setNotes(e.target.value)
            }}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify='space-around'>
              <KeyboardDatePicker
                label='Start Date'
                disableToolbar
                autoOk
                variant='inline'
                format='MM/dd/yyyy'
                margin='normal'
                id='date-picker-inline'
                value={startDate}
                onChange={handleSetStartDate}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                className={classes.KeyboardDatePicker}
              />
              <KeyboardDatePicker
                label='End Date'
                disableToolbar
                autoOk
                variant='inline'
                format='MM/dd/yyyy'
                margin='normal'
                id='date-picker-inline'
                value={endDate}
                onChange={handleSetEndDate}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                className={classes.KeyboardDatePicker}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </DialogContent>

        <DialogActions>
          <Button variant='contained' className={classes.button} onClick={handleCloseDialog} color='primary'>
            Cancel
          </Button>
          <Button variant='contained' className={classes.button} onClick={handleDialogSubmit} color='primary'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Tasks
