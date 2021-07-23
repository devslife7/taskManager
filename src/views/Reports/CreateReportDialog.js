import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  // FormControlLabel,
  // Grid,
  // InputLabel,
  makeStyles,
  MenuItem,
  MenuList,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { createReportFetch } from '../../redux/actions/user'
// import DateFnsUtils from '@date-io/date-fns'
// import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

const useStyles = makeStyles(theme => ({
  button: {
    margin: '0 0 0 10vw',
    fontSize: '1rem',
  },
  KeyboardDatePicker: {
    width: '140px',
  },
  title: {
    marginTop: '20px',
    marginLeft: '20px',
  },
  menuItem: {
    height: '4rem',
    justifyContent: 'space-between',
  },
  selected: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',

    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}))

export default function CreateReportDialog({ open, onClose }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const allProjects = useSelector(state => state.projects.allProjects)
  const currentUserId = useSelector(state => state.user.currentUser.id)

  const [selectedProjectId, setSelectedProjectId] = useState(0)
  const [title, setTitle] = useState('Report Title...')
  const [notes, setNotes] = useState('')

  const clearStateOnClose = () => {
    onClose()
    setSelectedProjectId(0)
    setNotes('')
  }

  // const [startDate, setStartDate] = useState(new Date())
  // const [endDate, setEndDate] = useState(new Date())
  // const handleSetStartDate = date => setStartDate(date)
  // const handleSetEndDate = date => setEndDate(date)

  const renderProjectList = () => {
    return allProjects.map((proj, idx) => (
      <MenuItem
        key={idx}
        className={`${selectedProjectId === proj.id && classes.selected} ${classes.menuItem}`}
        onClick={() => {
          setSelectedProjectId(proj.id)
          setTitle(`${proj.name} Report`)
        }}
      >
        {proj.name} <span>{proj.progress}%</span>
      </MenuItem>
    ))
  }

  const onReportCreate = () => {
    if (selectedProjectId === 0) {
      alert('Please select a project...')
    } else {
      clearStateOnClose()

      const requestBody = {
        report: {
          user_id: currentUserId,
          project_id: selectedProjectId,
          title: title,
          notes: notes,
        },
      }
      dispatch(createReportFetch(requestBody))
    }
  }

  return (
    <>
      <Dialog open={open} onClose={clearStateOnClose}>
        <Typography variant='h5' className={classes.title}>
          {'Create New Report'}
        </Typography>

        <DialogContent>
          {/* <Typography variant='h6' className={classes.title}>
            {'Choose Project:'}
          </Typography> */}
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            label='Title'
            value={title}
            onChange={e => {
              setTitle(e.target.value)
            }}
          />

          <Typography variant='h6' className={classes.title}>
            {'Choose Project:'}
          </Typography>

          <Paper elevation={4} style={{ margin: '.5rem 1rem', backgroundColor: '#f4f4f4' }}>
            <MenuList>{renderProjectList()}</MenuList>
          </Paper>

          <TextField
            variant='outlined'
            margin='normal'
            multiline
            rows={4}
            fullWidth
            label='notes'
            value={notes}
            onChange={e => {
              setNotes(e.target.value)
            }}
          />

          {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
          </MuiPickersUtilsProvider> */}
        </DialogContent>

        <DialogActions>
          <Button variant='outlined' className={classes.button} onClick={clearStateOnClose} color='primary'>
            Cancel
          </Button>
          <Button variant='contained' className={classes.button} onClick={onReportCreate} color='primary'>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
