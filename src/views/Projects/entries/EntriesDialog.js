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
import { useDispatch, useSelector } from 'react-redux'
import { createEntryFetch, editEntryFetch } from '../../../redux/actions/tasks'
import { fromUnixTime, getUnixTime } from 'date-fns'
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
  const currentTask = useSelector(state => state.tasks.currentTask)
  const currentUser = useSelector(state => state.user.currentUser)
  const [sliderValue, setSliderValue] = useState(50)
  const [notes, setNotes] = useState('') // should use null
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    if (entry.id) {
      setNotes(entry.notes)
      setSliderValue(entry.progress)
      setDate(fromUnixTime(entry.date))
    }
  }, [entry])

  const handleClose = () => {
    onClose()
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
    if (entry.id) {
      const requestBody = {
        entry: {
          date: getUnixTime(date),
          progress: sliderValue,
          notes: notes,
        },
      }
      dispatch(editEntryFetch(requestBody, entry.id)) // sends the request body for fetch
    } else {
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
    }
    onClose()
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
