import React, { useEffect, useState } from 'react'
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
import { createMilestoneFetch, editMilestoneFetch } from '../../../redux/actions/milestones'
import { useDispatch } from 'react-redux'
import { fromUnixTime } from 'date-fns/esm'
import { getUnixTime } from 'date-fns'

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

export default function MilestonesDialog({ open, onClose, projectId, milestone = {} }) {
  const classes = useStyle()
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  useEffect(() => {
    if (milestone.id) {
      setName(milestone.name)
      setStartDate(fromUnixTime(milestone.start_date))
      setEndDate(fromUnixTime(milestone.end_date))
    }
  }, [milestone])

  const handleSetStartDate = date => setStartDate(date)
  const handleSetEndDate = date => setEndDate(date)

  const handleSubmit = e => {
    e.preventDefault()

    if (milestone.id) {
      const requestBody = {
        milestone: {
          name: name,
          start_date: getUnixTime(startDate),
          end_date: getUnixTime(endDate),
        },
      }

      dispatch(editMilestoneFetch(requestBody, milestone.id))
    } else {
      const requestBody = {
        milestone: {
          name: name,
          start_date: getUnixTime(startDate),
          end_date: getUnixTime(endDate),
          project_id: projectId,
        },
      }

      dispatch(createMilestoneFetch(requestBody))

      // Clears the form
      setName('')
      setStartDate(new Date())
      setEndDate(new Date())
    }

    onClose()
  }

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <form onSubmit={handleSubmit}>
          <Typography variant='h5' style={{ marginTop: '20px', marginLeft: '30px' }}>
            {milestone.id ? 'Edit Milestone' : 'New Milestone'}
          </Typography>

          <DialogContent className={classes.DialogContent}>
            <TextField
              autoFocus
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

          <DialogActions style={{ marginTop: '10px' }}>
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
