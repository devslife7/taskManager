import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Slider,
  TextField,
  Typography,
} from "@material-ui/core"
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import React, { useState } from "react"
import { format, fromUnixTime } from "date-fns"

const useStyles = makeStyles(theme => ({
  button: {
    textTransform: "none",
    fontSize: "1rem",
    marginLeft: "10vw",
  },
  KeyboardDatePicker: {
    width: "140px",
    marginTop: 0,
  },
}))

export default function EditEntryDialog({ currentEntry, openEditDialog, handleCloseEditDialog }) {
  const classes = useStyles()
  console.log(currentEntry)
  console.log("sets the default state in edit entry dialog")
  console.log("Current entry value", typeof 80)
  const [sliderValue, setSliderValue] = useState(80)
  const [date, setDate] = useState(format(fromUnixTime(currentEntry.date), "PP"))
  const [notes, setNotes] = useState(currentEntry.notes)

  console.log("Slider Value: ", sliderValue)

  const handleSliderChange = (e, newValue) => {
    setSliderValue(newValue)
  }

  const handleEditSubmit = () => {
    console.log("Edit Submits")
    handleCloseEditDialog()
  }

  const marks = [
    { value: 5, label: "5%" },
    { value: 25, label: "25%" },
    { value: 50, label: "50%" },
    { value: 75, label: "75%" },
    { value: 100, label: "100%" },
  ]

  return (
    <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
      <DialogTitle disableTypography>
        <Typography variant='h5'>Edit Entry</Typography>
      </DialogTitle>

      <DialogContent>
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
          defaultValue={90}
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
        <Button variant='outlined' className={classes.button} onClick={handleCloseEditDialog} color='primary'>
          Cancel
        </Button>
        <Button variant='contained' className={classes.button} onClick={handleEditSubmit} color='primary'>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}
