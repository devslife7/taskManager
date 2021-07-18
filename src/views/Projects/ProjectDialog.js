import React, { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Grid,
  InputLabel,
  makeStyles,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { useDispatch } from 'react-redux'
import { addProjectFetch, editProjectFetch } from '../../redux/actions/projects'
import { fromUnixTime, getUnixTime } from 'date-fns'

const useStyles = makeStyles(theme => ({
  button: {
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

export default function ProjectDialog({ open, onClose, project = {} }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [displayImport, setDisplayImport] = useState(false)

  useEffect(() => {
    if (project.id) {
      setName(project.name)
      setDescription(project.description)
      setStartDate(fromUnixTime(project.start_date))
      setEndDate(fromUnixTime(project.end_date))
    }
  }, [project])

  const handleSetStartDate = date => setStartDate(date)
  const handleSetEndDate = date => setEndDate(date)

  const handleSubmit = () => {
    if (project.id) {
      const requestBody = {
        project: {
          name: name,
          description: description,
          start_date: getUnixTime(startDate),
          end_date: getUnixTime(endDate),
        },
      }
      dispatch(editProjectFetch(requestBody, project.id))
    } else {
      const requestBody = {
        project: {
          name: name,
          description: description,
          start_date: getUnixTime(startDate),
          end_date: getUnixTime(endDate),
        },
      }
      dispatch(addProjectFetch(requestBody))
    }

    onClose()
  }

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <Typography variant='h5' style={{ marginTop: '20px', marginLeft: '30px' }}>
          {project.id ? 'Edit Project' : 'New Project'}
        </Typography>

        {!project.id && (
          <>
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
          </>
        )}

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
          <Button variant='contained' className={classes.button} onClick={handleSubmit} color='primary'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
