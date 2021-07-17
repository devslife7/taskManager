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

export default function TasksDialog({ open, onClose }) {
  const classes = useStyles()
  const [name, setName] = useState('')
  const [hours, setHours] = useState('')
  const [notes, setNotes] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const handleSetStartDate = date => setStartDate(date)
  const handleSetEndDate = date => setEndDate(date)

  const handleSubmit = () => {
    // const entriesURL = 'http://localhost:3000/tasks/'
    // const configuratinObj = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     tasks: {
    //       // date: date,
    //       // notes: notes,
    //       // completion_percentage: completionPercentage,
    //       // user_id: currentUser.id,
    //       // task_id: currentTask.id,
    //     },
    //   }),
    // }
    // fetch(entriesURL, configuratinObj)
    //   .then(resp => resp.json())
    //   .then(data => dispatch(addEntry(data)))
    // setShowForm(false)
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
                id='date-picker-inline'
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
                id='date-picker-inline'
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
