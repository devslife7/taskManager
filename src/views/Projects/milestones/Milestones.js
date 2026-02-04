import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MilestonesTable from './MilestonesTable'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MilestonesGraph from './MilestonesGraph'
import { fromUnixTime, format, formatDuration, intervalToDuration, isFuture } from 'date-fns'
import MilestonesDialog from './MilestonesDialog'
import ProjectDialog from '../ProjectDialog'
import { clearCurrentProject, deleteProjectFetch } from '../../../redux/actions/projects'

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
  const dispatch = useDispatch()
  const currentProject = useSelector(state => state.projects.currentProject)

  const [openDialog, setOpenDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)

  const handleOpenEditDialog = () => setOpenEditDialog(true)
  const handleCloseEditDialog = () => setOpenEditDialog(false)
  const handleOpenDeleteDialog = () => setOpenDeleteDialog(true)
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false)

  const handleDeleteProject = () => {
    dispatch(deleteProjectFetch(currentProject.id))
    handleCloseDeleteDialog()
    dispatch(clearCurrentProject()) // makes it go back to projects view
  }

  const handleOpenAddMilestoneDialog = () => setOpenDialog(true)
  const handleCloseAddMilestoneDialog = () => setOpenDialog(false)

  const timeUntilProjectDeadline = () => {
    const duration = intervalToDuration({
      start: fromUnixTime(currentProject.end_date),
      end: new Date(),
    })

    delete duration.minutes
    delete duration.seconds

    return formatDuration(duration, { delimiter: ', ' })
  }

  const isProjectActive = () => isFuture(fromUnixTime(currentProject.end_date))

  return (
    <div style={{ padding: '0 50px', overflow: 'scroll' }}>
      <Grid container>
        <Grid item xs={10}>
          <Typography variant='h6' align='center'>
            {currentProject.description}
          </Typography>

          <Grid container justifyContent='center'>
            <Typography variant='h6' align='center'>
              {format(fromUnixTime(currentProject.start_date), 'PP')} {' - '}
              {format(fromUnixTime(currentProject.end_date), 'PP')}
            </Typography>

            <Typography variant='h6' align='center' style={{ marginLeft: '1rem' }}>
              ( Time until deadline: {isProjectActive() ? timeUntilProjectDeadline() : 'Past deadline'} )
            </Typography>
          </Grid>
          <Typography variant='subtitle1' align='center'>
            Progress: {currentProject.progress}%
          </Typography>
          <Typography variant='subtitle1' align='center'>
            *The average progress of all milestones determines parent project progress*
          </Typography>
        </Grid>
        <Grid item xs={2} container direction='column' alignItems='flex-end' justifyContent='space-between'>
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
        onClick={handleOpenAddMilestoneDialog}
      >
        Add Milestone
      </Button>

      <MilestonesTable />
      <MilestonesGraph />

      <MilestonesDialog
        open={openDialog}
        onClose={handleCloseAddMilestoneDialog}
        projectId={currentProject.id}
      />
      <ProjectDialog open={openEditDialog} onClose={handleCloseEditDialog} project={currentProject} />

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>
          <Typography variant='h5' component='span'>Deleting Project: {`${currentProject.name}`}</Typography>
        </DialogTitle>
        <DialogContent>
          {'Are you sure you want to delete this Project?\nThis action cannot be undone.'}
        </DialogContent>

        <DialogActions>
          <Button variant='outlined' className={classes.button} onClick={handleCloseDeleteDialog}>
            Cancel
          </Button>
          <Button variant='contained' className={classes.removeButton} onClick={handleDeleteProject}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
