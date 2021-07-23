import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AddIcon from '@material-ui/icons/Add'
import TasksGraph from './TasksGraph'

import TaskTable from './TaskTable'
import { fromUnixTime, format } from 'date-fns'
import TasksDialog from './TasksDialog'

const useStyles = makeStyles(() => ({
  addTaskButton: {
    textTransform: 'none',
    fontSize: '1rem',
    marginLeft: '6.5vw',
  },
}))

export default function Tasks() {
  const classes = useStyles()
  const currentMilestone = useSelector(state => state.milestones.currentMilestone)

  const [openDialog, setOpenDialog] = useState(false)

  const handleOpenDialog = () => setOpenDialog(true)
  const handleCloseDialog = () => setOpenDialog(false)

  return (
    <div style={{ padding: '0 50px', overflow: 'scroll' }}>
      <Grid container justify='space-around' style={{ margin: '1rem auto', width: '50vw' }}>
        <Typography variant='subtitle1' align='center'>
          {format(fromUnixTime(currentMilestone.start_date), 'PP')} {' - '}
          {format(fromUnixTime(currentMilestone.end_date), 'PP')}
        </Typography>
        <Typography variant='subtitle1' align='center'>
          Progress: {currentMilestone.progress}%
        </Typography>
        <Typography variant='subtitle1' align='center'>
          Hours: {currentMilestone.hours}
        </Typography>
        <Typography variant='subtitle1' align='center'>
          *The average progress of all tasks determines parent milestones progress*
        </Typography>
      </Grid>

      <Button
        variant='contained'
        color='primary'
        startIcon={<AddIcon />}
        className={classes.addTaskButton}
        onClick={handleOpenDialog}
      >
        Add Task
      </Button>

      <TaskTable />
      <TasksGraph />

      <TasksDialog open={openDialog} onClose={handleCloseDialog} milestoneId={currentMilestone.id} />
    </div>
  )
}
