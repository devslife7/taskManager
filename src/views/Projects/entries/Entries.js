import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
  Slider,
  TextField,
  Typography,
} from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddIcon from '@material-ui/icons/Add'
import { createEntryFetch } from '../../../actions/tasks'
import EntriesTable from './EntriesTable'
import { fromUnixTime, format, getUnixTime } from 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import EntriesGraph from './EntriesGraph'
import EntriesDialog from './EntriesDialog'

const useStyles = makeStyles(theme => ({
  button: {
    textTransform: 'none',
    fontSize: '1rem',
    marginLeft: '15vw',
  },
  KeyboardDatePicker: {
    width: '140px',
    marginTop: 0,
  },
}))

export default function Entries() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const currentTask = useSelector(state => state.tasks.currentTask)
  const currentUser = useSelector(state => state.user.currentUser)
  const [openDialog, setOpenDialog] = useState(false)
  const [date, setDate] = useState(new Date())
  const [sliderValue, setSliderValue] = useState('50')
  const [notes, setNotes] = useState('')

  const handleOpenDialog = () => setOpenDialog(true)
  const handleCloseDialog = () => {
    setOpenDialog(false)
    setDate(new Date())
    setSliderValue('50')
    setNotes('')
  }

  const handleSliderChange = (e, newValue) => {
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
    { value: 5, label: '5%' },
    { value: 25, label: '25%' },
    { value: 50, label: '50%' },
    { value: 75, label: '75%' },
    { value: 100, label: '100%' },
  ]

  return (
    <div style={{ padding: '0 50px', height: '90vh', overflow: 'scroll' }}>
      {/* <Paper style={{ width: "50vw", margin: "0 auto" }}> */}
      <Grid container justify='space-around' style={{ margin: '1rem auto', width: '50vw' }}>
        <Typography variant='subtitle1' align='center'>
          Owner(s): Owner
        </Typography>
        <Typography variant='subtitle1' align='center'>
          Hours: {currentTask.hours}
        </Typography>
        <Typography variant='subtitle1' align='center'>
          Progress: {currentTask.progress}%
        </Typography>
        <Typography variant='subtitle1' align='center'>
          {!!currentTask.start_date && (
            <>
              {format(fromUnixTime(currentTask.start_date), 'PP')} -{' '}
              {format(fromUnixTime(currentTask.end_date), 'PP')}
            </>
          )}
        </Typography>
        <Typography variant='subtitle1' align='center'>
          {currentTask.notes}
        </Typography>
        <Typography variant='subtitle1' align='center'>
          *Latest entry progress determines parent task progress*
        </Typography>
      </Grid>

      <Button
        variant='contained'
        color='primary'
        startIcon={<AddIcon />}
        className={classes.button}
        onClick={handleOpenDialog}
      >
        Add Entry
      </Button>

      <EntriesTable />
      <EntriesGraph />

      <EntriesDialog open={openDialog} onClose={handleCloseDialog} />

      {/* <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle disableTypography>
          <Typography variant='h5'>New Entry</Typography>
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
            Progress: {`${sliderValue}%`}
          </Typography>
          <Slider
            defaultValue={50}
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
          <Button variant='outlined' className={classes.button} onClick={handleCloseDialog} color='primary'>
            Cancel
          </Button>
          <Button variant='contained' className={classes.button} onClick={handleEditSubmit} color='primary'>
            Submit
          </Button>
        </DialogActions>
      </Dialog> */}
    </div>
  )
}
