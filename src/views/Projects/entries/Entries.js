import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AddIcon from '@material-ui/icons/Add'
import EntriesTable from './EntriesTable'
import { fromUnixTime, format } from 'date-fns'
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
  const currentTask = useSelector(state => state.tasks.currentTask)
  const [openDialog, setOpenDialog] = useState(false)

  const handleOpenDialog = () => setOpenDialog(true)
  const handleCloseDialog = () => setOpenDialog(false)

  return (
    <div style={{ padding: '0 50px', height: '90vh', overflow: 'scroll' }}>
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

      <EntriesTable records={currentTask.entries} />
      <EntriesGraph records={currentTask.entries} />
      <EntriesDialog open={openDialog} onClose={handleCloseDialog} />
    </div>
  )
}
