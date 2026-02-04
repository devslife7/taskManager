import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slider,
  TextField,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { useDispatch, useSelector } from 'react-redux'
import { createEntryFetch, editEntryFetch } from '../../../redux/actions/tasks'
import { fromUnixTime, getUnixTime } from 'date-fns'
import { useEffect } from 'react'

const useStyle = makeStyles(() => ({
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
  const handleSubmit = () => {
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
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          <Typography variant='h5' component='span'>{entry.id ? 'Edit Entry' : 'New Entry'}</Typography>
        </DialogTitle>

        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label='Date'
              value={date}
              onChange={setDate}
              format='MM/dd/yyyy'
              slotProps={{
                textField: {
                  margin: 'normal',
                  className: classes.KeyboardDatePicker,
                },
              }}
            />
          </LocalizationProvider>

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
          <Button variant='contained' className={classes.button} onClick={handleSubmit} color='primary'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
