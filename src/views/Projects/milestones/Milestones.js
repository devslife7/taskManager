import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import MilestonesTable from './MilestonesTable'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import MilestonesGraph from './MilestonesGraph'
import { fromUnixTime, format } from 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import MilestonesDialog from './MilestonesDialog'
import ProjectDialog from '../ProjectDialog'

const useStyles = makeStyles(theme => ({
  button: {
    fontSize: '1rem',
    // marginLeft: "10vw",
    // marginTop: "2vh",
  },
  addMilestoneButton: {
    textTransform: 'none',
    fontSize: '1rem',
    marginLeft: '6.5vw',
    marginTop: '2vh',
  },
  editButton: {
    textTransform: 'none',
    fontSize: '1rem',
    color: 'white',
    marginBotton: '1rem',
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },
  removeButton: {
    textTransform: 'none',
    fontSize: '1rem',
    color: 'white',
    backgroundColor: theme.palette.error.main,
    // marginLeft: "10vw",
    // marginTop: "2vh",
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
}))

export default function Milestones() {
  const classes = useStyles()
  const currentProject = useSelector(state => state.projects.currentProject)

  const [openDialog, setOpenDialog] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [name, setName] = useState('')
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [description, setDescription] = useState('')

  const handleCloseEditDialog = () => setOpenEditDialog(false)
  const handleOpenEditDialog = () => {
    setName(currentProject.name)
    setDescription(currentProject.description)
    setOpenEditDialog(true)
    setStartDate(fromUnixTime(currentProject.start_date))
    setEndDate(fromUnixTime(currentProject.end_date))
  }
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false)
  const handleOpenDeleteDialog = () => setOpenDeleteDialog(true)

  const handleOk = () => {
    // dispatch(deleteEntryFetch(currentEntry.id))
    handleCloseDeleteDialog()
  }

  const handleSetStartDate = date => setStartDate(date)
  const handleSetEndDate = date => setEndDate(date)
  const handleCloseDialog = () => setOpenDialog(false)
  const handleOpenDialog = () => setOpenDialog(true)

  return (
    <div style={{ padding: '0 50px', overflow: 'scroll' }}>
      <Grid container>
        <Grid item xs={10}>
          <Typography variant='h6' align='center'>
            {currentProject.description}
          </Typography>

          <Typography variant='subtitle1' align='center'>
            {format(fromUnixTime(currentProject.start_date), 'PP')} -{' '}
            {format(fromUnixTime(currentProject.end_date), 'PP')}
          </Typography>
          <Typography variant='subtitle1' align='center'>
            Progress: {currentProject.progress}%
          </Typography>
          <Typography variant='subtitle1' align='center'>
            *The average progress of all milestones determines parent project progress*
          </Typography>
        </Grid>
        <Grid item xs={2} container direction='column' alignItems='flex-end' justify='space-between'>
          <Button
            variant='contained'
            color='primary'
            startIcon={<DeleteIcon />}
            className={classes.removeButton}
            onClick={handleOpenDeleteDialog}
          >
            Remove Project
          </Button>
          <Button
            variant='contained'
            color='primary'
            startIcon={<EditIcon />}
            className={classes.editButton}
            onClick={handleOpenEditDialog}
          >
            Edit Project
          </Button>
        </Grid>
      </Grid>

      <Button
        variant='contained'
        color='primary'
        startIcon={<AddIcon />}
        className={classes.addMilestoneButton}
        onClick={handleOpenDialog}
      >
        Add Milestone
      </Button>

      <MilestonesTable />
      <MilestonesGraph />

      <MilestonesDialog open={openDialog} onClose={handleCloseDialog} projectId={currentProject.id} />
      <ProjectDialog open={openEditDialog} onClose={handleCloseEditDialog} project={currentProject} />

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle disableTypography>
          <Typography variant='h5'>Deleting Project: {`${currentProject.name}`}</Typography>
        </DialogTitle>
        <DialogContent>
          {'Are you sure you want to delete this Project?\nThis action cannot be undone.'}
        </DialogContent>

        <DialogActions>
          <Button variant='outlined' className={classes.button} onClick={handleCloseDeleteDialog}>
            Cancel
          </Button>
          <Button variant='contained' className={classes.removeButton} onClick={handleOk}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
