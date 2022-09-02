import React, { useEffect, useState } from 'react'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core'
import { fromUnixTime, getUnixTime } from 'date-fns'
import { useDispatch } from 'react-redux'
import { createTaskFetch, editTaskFetch } from '../../../redux/actions/tasks'

const useStyles = makeStyles(() => ({
  button: {
    textTransform: 'none',
    fontSize: '1rem',
    marginLeft: '10vw',
  },
  KeyboardDatePicker: {
    width: '140px',
  },
  DialogContent: {
    height: '350px',
    width: '350px',
  },
}))

export default function TasksDialog({ open, onClose, milestoneId, task = {} }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [hours, setHours] = useState('')
  const [notes, setNotes] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  useEffect(() => {
    if (task.id) {
      setName(task.name)
      setHours(task.hours)
      setNotes(task.notes)
      setStartDate(fromUnixTime(task.start_date))
      setEndDate(fromUnixTime(task.end_date))
    }
  }, [task])

  const handleSetStartDate = date => setStartDate(date)
  const handleSetEndDate = date => setEndDate(date)

  const handleSubmit = e => {
    e.preventDefault()

    if (task.id) {
      const requestBody = {
        task: {
          name: name,
          hours: hours,
          notes: notes,
          start_date: getUnixTime(startDate),
          end_date: getUnixTime(endDate),
        },
      }
      dispatch(editTaskFetch(requestBody, task.id)) // sends the request body for edit fetch
    } else {
      const requestBody = {
        task: {
          name: name,
          hours: hours,
          notes: notes,
          start_date: getUnixTime(startDate),
          end_date: getUnixTime(endDate),
          milestone_id: milestoneId,
        },
      }

      dispatch(createTaskFetch(requestBody))

      // Clears form
      setName('')
      setHours('')
      setNotes('')
      setStartDate(new Date())
      setEndDate(new Date())
    }

    onClose()
  }

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <form onSubmit={handleSubmit}>
          <Typography variant='h5' style={{ marginTop: '20px', marginLeft: '20px' }}>
            {task.id ? 'Edit Task' : 'New Task'}
          </Typography>

          <DialogContent className={classes.DialogContent}>
            <TextField
              label='Name'
              variant='outlined'
              margin='normal'
              autoFocus
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
              <Grid container justifyContent='space-around'>
                <KeyboardDatePicker
                  label='Start Date'
                  disableToolbar
                  autoOk
                  variant='inline'
                  format='MM/dd/yyyy'
                  margin='normal'
                  id='date-picker-start-date'
                  value={startDate}
                  onChange={handleSetStartDate}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
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
                  id='date-picker-end-date'
                  value={endDate}
                  onChange={handleSetEndDate}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  className={classes.KeyboardDatePicker}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </DialogContent>

          <DialogActions>
            <Button variant='outlined' className={classes.button} onClick={onClose} color='primary'>
              Cancel
            </Button>
            <Button type='submit' variant='contained' className={classes.button} color='primary'>
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
