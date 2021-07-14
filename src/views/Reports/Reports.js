import { Button, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import AddIcon from '@material-ui/icons/Add'
import { useDispatch, useSelector } from 'react-redux'
import CreateReportDialog from './CreateReportDialog'
import { fetchProjects } from '../../actions/projects'

const useStyles = makeStyles(() => ({
  createBtn: {
    margin: '7rem 0 0 10rem',
  },
  reportsContainer: {
    margin: '7rem 0 0 10rem',
    backgroundColor: '#f4f4f4',
  },
}))

export default function Reports() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const userReports = useSelector(state => state.user.currentUser.reports)
  const [openDialog, setOpenDialog] = useState(false)

  const handleOpenDialog = () => setOpenDialog(true)
  const handleCloseDialog = () => setOpenDialog(false)

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  return (
    <div>
      <div className={classes.createBtn}>
        <Button
          variant='contained'
          color='primary'
          startIcon={<AddIcon style={{ fontSize: '1.4rem' }} />}
          style={{ fontSize: '1.2rem' }}
          onClick={handleOpenDialog}
        >
          Create Report
        </Button>
      </div>

      {/* Dialog prompting to create a new Report */}
      <CreateReportDialog open={openDialog} onClose={handleCloseDialog} />

      <div className={classes.reportsContainer}>
        {userReports.length === 0 ? (
          <div>You have not created any Reports</div>
        ) : (
          <div>You have some Reports</div>
        )}
      </div>
    </div>
  )
}
