import React, { useState } from 'react'
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
} from '@material-ui/core'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { useDispatch } from 'react-redux'
import { editEntryFetch } from '../../../actions/tasks'
import { getUnixTime } from 'date-fns'
import { useEffect } from 'react'

const useStyle = makeStyles(theme => ({
  button: {
    textTransform: 'none',
    fontSize: '1rem',
    marginLeft: '10vw',
  },
  KeyboardDatePicker: {
    width: '140px',
    marginTop: 0,
  },
}))

export default function EntriesDialog({ open, onClose, entry = {} }) {
  const classes = useStyle()
  const dispatch = useDispatch()
  const [sliderValue, setSliderValue] = useState(80)
  const [notes, setNotes] = useState() // should use null
  const [date, setDate] = useState()

  // console.log('THIS IS entry: ', entry.entries() ? 'true' : 'false')

  // if (open && notes === undefined) {
  //   setNotes(entry.notes || '')
  //   console.log('enters if statement')
  // }

  useEffect(() => {
    setNotes(entry.notes)
  }, [entry])

  const handleClose = () => {
    onClose()
    setNotes()
  }

  const marks = [
    { value: 5, label: '5%' },
    { value: 25, label: '25%' },
    { value: 50, label: '50%' },
    { value: 75, label: '75%' },
    { value: 100, label: '100%' },
  ]

  const handleSliderChange = (e, newValue) => {
    setSliderValue(newValue)
  }
  const handleEditSubmit = () => {
    console.log('pressed the submit button')
    // const requestBody = {
    //   entry: {
    //     date: getUnixTime(date),
    //     progress: sliderValue,
    //     notes: notes,
    //   },
    // }
    // dispatch(editEntryFetch(requestBody, currentEntry.id)) // sends the request body for fetch
    // onClose()
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
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
              // defaultValue={entry.date}
              value={date}
              onChange={setDate}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              className={classes.KeyboardDatePicker}
            />
          </MuiPickersUtilsProvider>

          <Typography gutterBottom style={{ margin: '20px 0px 5px 0px' }}>
            Progress: {sliderValue}%
          </Typography>
          <Slider
            // defaultValue={entry.progress}
            value={sliderValue}
            step={5}
            marks={marks}
            min={5}
            max={100}
            onChange={handleSliderChange}
            style={{ marginBottom: '30px' }}
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
          <Button variant='outlined' className={classes.button} onClick={onClose} color='primary'>
            Cancel
          </Button>
          <Button variant='contained' className={classes.button} onClick={handleEditSubmit} color='primary'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
