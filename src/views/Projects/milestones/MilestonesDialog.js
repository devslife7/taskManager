import React, { useState } from 'react'
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

import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

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

export default function MilestonesDialog({ open, onClose }) {
  const classes = useStyle()
  const [name, setName] = useState('')
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()

  const handleSetStartDate = date => setStartDate(date)
  const handleSetEndDate = date => setEndDate(date)

  const handleSubmit = () => {}

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <Typography variant='h5' style={{ marginTop: '20px', marginLeft: '30px' }}>
          {'Edit Milestone'}
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
            style={{ marginBottom: '20px' }}
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

        <DialogActions style={{ marginTop: '10px' }}>
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
