import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Grid,
  InputLabel,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import React, { useState } from 'react'
import { Switch } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  button: {
    textTransform: 'none',
    margin: '5vh 0 0 10vw',
    fontSize: '1rem',
  },
  KeyboardDatePicker: {
    width: '140px',
  },
  DialogContent: {
    height: '250px',
    width: '350px',
  },
}))

export default function AddProjectDialog(props) {
  const { open, onClose } = props
  const classes = useStyles()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [displayImport, setDisplayImport] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const handleSetStartDate = date => setStartDate(date)
  const handleSetEndDate = date => setEndDate(date)

  return (
    <>
      <Dialog open={true} onClose={onClose}>
        <Typography variant='h5' style={{ marginTop: '20px', marginLeft: '30px' }}>
          {'New Project'}
        </Typography>

        <FormControlLabel
          control={
            <Switch
              checked={displayImport}
              onChange={() => setDisplayImport(!displayImport)}
              name='checkedB'
              color='primary'
            />
          }
          label='Import From Excel File'
          style={{ marginTop: '20px', marginLeft: '15px', marginBottom: '10px' }}
        />

        {displayImport ? (
          <DialogContent className={classes.DialogContent}>
            <InputLabel htmlFor='my-input' style={{ margin: '20px 0px' }}>
              Select Import File
            </InputLabel>
            <input
              id='customFile'
              type='file'
              // onChange={e => setImportFile(e.target.files[0])}
              // style={{ color: "red", backgroundColor: "yellow" }}
            />
          </DialogContent>
        ) : (
          <DialogContent className={classes.DialogContent}>
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              label='Name'
              value={name}
              onChange={e => {
                setName(e.target.value)
              }}
            />
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              label='Description'
              value={description}
              onChange={e => {
                setDescription(e.target.value)
              }}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify='space-around'>
                <KeyboardDatePicker
                  id='new-project-start-date-picker'
                  disableToolbar
                  autoOk
                  variant='inline'
                  format='MM/dd/yyyy'
                  margin='normal'
                  label='Start Date'
                  value={startDate}
                  onChange={handleSetStartDate}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  className={classes.KeyboardDatePicker}
                />
                <KeyboardDatePicker
                  id='new-project-end-date-picker'
                  disableToolbar
                  autoOk
                  variant='inline'
                  format='MM/dd/yyyy'
                  margin='normal'
                  label='End Date'
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
        )}

        <DialogActions>
          <Button variant='outlined' className={classes.button} onClick={onClose} color='primary'>
            Cancel
          </Button>
          <Button variant='contained' className={classes.button} onClick={onClose} color='primary'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
