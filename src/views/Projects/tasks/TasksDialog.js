import React, { useState } from 'react'
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
import { fromUnixTime } from 'date-fns'
import { useDispatch } from 'react-redux'
import { createTaskFetch } from '../../../redux/actions/tasks'

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

export default function TasksDialog({ open, onClose, milestoneId }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [hours, setHours] = useState('')
  const [notes, setNotes] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const handleSetStartDate = date => setStartDate(date)
  const handleSetEndDate = date => setEndDate(date)

  const handleSubmit = () => {
    const requestBody = {
      task: {
        name: name,
        hours: hours,
        notes: notes,
        start_date: fromUnixTime(startDate),
        end_date: fromUnixTime(endDate),
        progress: 0,
        milestone_id: milestoneId,
      },
    }

    dispatch(createTaskFetch(requestBody))

    // const tasksURL = 'http://localhost:3000/tasks/'
    // const postRequest = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     task: {
    //       name: name,
    //       hours: hours,
    //       notes: notes,
    //       start_date: fromUnixTime(startDate),
    //       end_date: fromUnixTime(endDate),
    //       progress: 0,
    //       milestone_id: milestoneId,
    //     },
    //   }),
    // }
    // fetch(tasksURL, postRequest)
    //   .then(resp => resp.json())
    //   .then(data => console.log('Data from fetch: ', data))
    onClose()
  }

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <Typography variant='h5' style={{ marginTop: '20px', marginLeft: '20px' }}>
          {'New Task'}
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
          <Button variant='contained' className={classes.button} onClick={handleSubmit} color='primary'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
