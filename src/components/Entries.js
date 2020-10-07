import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  makeStyles,
  Slider,
  TextField,
  Typography,
} from "@material-ui/core"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import AddIcon from "@material-ui/icons/Add"
import { createEntryFetch } from "../actions/tasks"
import EntriesTable from "./EntriesTable"
import { fromUnixTime, format, getUnixTime } from "date-fns"
import DateFnsUtils from "@date-io/date-fns"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers"

const useStyles = makeStyles(theme => ({
  button: {
    textTransform: "none",
    fontSize: "1rem",
    color: "white",
    marginLeft: "10vw",
    marginTop: "2vh",
  },
  KeyboardDatePicker: {
    width: "140px",
  },
}))

export default function Entries() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const currentTask = useSelector(state => state.tasks.currentTask)
  const currentUser = useSelector(state => state.user.currentUser)
  const [openDialog, setOpenDialog] = useState(false)
  const [date, setDate] = useState(new Date())
  const [sliderValue, setSliderValue] = useState("50")
  const [notes, setNotes] = useState("")

  const handleOpenDialog = () => setOpenDialog(true)
  const handleCloseDialog = () => {
    setOpenDialog(false)
    setDate(new Date())
    setSliderValue("50")
    setNotes("")
  }

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue)
  }

  const handleEditSubmit = () => {
    const requestBody = {
      user_id: currentUser.id,
      entry: {
        date: getUnixTime(date),
        progress: sliderValue,
        notes: notes,
        task_id: currentTask.id,
      },
    }
    dispatch(createEntryFetch(requestBody))
    handleCloseDialog()
  }

  const marks = [
    { value: 5, label: "5%" },
    { value: 25, label: "25%" },
    { value: 50, label: "50%" },
    { value: 75, label: "75%" },
    { value: 100, label: "100%" },
  ]

  return (
    <div style={{ padding: "0 50px", height: "90vh", overflow: "scroll" }}>
      <Typography variant='h6' align='center'>
        {currentTask.notes}
      </Typography>
      <Typography variant='subtitle1' align='center'>
        {!!currentTask.start_date && (
          <>
            {format(fromUnixTime(currentTask.start_date), "PP")} -{" "}
            {format(fromUnixTime(currentTask.end_date), "PP")}
          </>
        )}
      </Typography>
      <Typography variant='subtitle1' align='center'>{`Progress: ${currentTask.progress}%`}</Typography>
      <Typography variant='subtitle1' align='center'>{`Hours: ${currentTask.hours}`}</Typography>
      <Typography variant='subtitle1' align='center'>{`Owner(s): Owner`}</Typography>

      <Button
        variant='contained'
        color='primary'
        startIcon={<AddIcon />}
        className={classes.button}
        onClick={handleOpenDialog}>
        Add Entry
      </Button>

      <EntriesTable />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <Typography variant='h5' style={{ marginTop: "20px", marginLeft: "20px" }}>
          {"New Entry"}
        </Typography>

        <DialogContent className={classes.DialogContent}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant='inline'
              format='MM/dd/yyyy'
              margin='normal'
              id='date-picker-inline'
              label='Date'
              autoOk // autocloses picker
              value={date}
              onChange={setDate}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              className={classes.KeyboardDatePicker}
            />
          </MuiPickersUtilsProvider>

          <Typography gutterBottom style={{ margin: "20px 0px 5px 0px" }}>
            Progress: {`${sliderValue}%`}
          </Typography>
          <Slider
            defaultValue={50}
            step={5}
            marks={marks}
            min={5}
            max={100}
            onChange={handleSliderChange}
            style={{ marginBottom: "30px" }}
          />

          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            multiline
            rows={2}
            label='Notes'
            value={notes}
            onChange={e => {
              setNotes(e.target.value)
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button variant='contained' className={classes.button} onClick={handleCloseDialog} color='primary'>
            Cancel
          </Button>
          <Button variant='contained' className={classes.button} onClick={handleEditSubmit} color='primary'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
