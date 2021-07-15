import React, { useEffect } from 'react'
import { Button, Divider, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { useDispatch, useSelector } from 'react-redux'
import { deleteReportFetch, fetchCurrentReport } from '../../actions/user'
import { getUnixTime, fromUnixTime, parseISO, format } from 'date-fns'

const useStyles = makeStyles(() => ({
  backBtn: {
    fontSize: '1.2rem',
    margin: '1rem 0 0 10rem',
  },
  deleteBtn: {
    fontSize: '1.1rem',
    margin: '1rem 0 0 0rem',
    color: 'red',
  },
  reportPaper: {
    margin: '1rem 10rem',
    height: '62rem',
    width: '45rem',
  },
  reportTitle: {
    margin: '4rem 0 2rem 0',
    textAlign: 'center',
    fontWeight: 300,
  },
  detailsContainer: {
    padding: '1rem 3rem',
    fontSize: '1.2rem',
  },
}))

export default function ReportView({ handleExitReportView }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.currentUser)
  const currentReport = useSelector(state => state.user.currentReport)
  const reportProj = currentReport.project

  useEffect(() => {
    dispatch(fetchCurrentReport(6))
  }, [dispatch]) // temp auto fetch of report id: 6

  const projectStatus = proj => {
    const todaysDate = getUnixTime(new Date()) // Today's date
    return proj.end_date < todaysDate ? 'Inactive' : 'Active'
  }

  const handleDeleteReport = () => {
    const message = 'Are you sure you want to delete the current report?'

    if (window.confirm(message)) {
      console.log('delete project')

      // make a delete request and update redux
      dispatch(deleteReportFetch(currentReport.id))
    }
  }

  return (
    <>
      <Grid container>
        <Grid item>
          <Button
            variant='contained'
            color='primary'
            startIcon={<ArrowBackIcon style={{ fontSize: '1.4rem' }} />}
            className={classes.backBtn}
            onClick={handleExitReportView}
          >
            Back
          </Button>
        </Grid>

        <Paper elevation={4} className={classes.reportPaper}>
          <Typography variant='h3' className={classes.reportTitle}>
            {currentReport.title}
          </Typography>

          <Divider />

          <div className={classes.detailsContainer}>
            <div>Status: {projectStatus(reportProj)}</div>
            <div>Progress: {reportProj.progress}%</div>
            <div>Description: {reportProj.description}</div>
          </div>

          <Divider />

          <div className={classes.detailsContainer}>
            <div>Project id: {reportProj.id}</div>
            <div>Project Created: {format(parseISO(reportProj.created_at), 'p PP')}</div>
            <div>Project Lasted Update: {format(parseISO(reportProj.updated_at), 'p PP')}</div>
            <div>Project Start: {format(fromUnixTime(reportProj.start_date), 'PP')}</div>
            <div>Project Deadline: {format(fromUnixTime(reportProj.end_date), 'PP')}</div>
          </div>

          <Divider />

          <div className={classes.detailsContainer}>
            <div>
              Report Owner: {currentUser.first_name} {currentUser.last_name}
            </div>
            <div>Report Created: {format(parseISO(currentReport.created_at), 'p PP')}</div>
            <div>Report Owner Notes: {currentReport.notes}</div>
          </div>

          <Divider />
        </Paper>
        <Grid item>
          <Button variant='outlined' className={classes.deleteBtn} onClick={handleDeleteReport}>
            Delete Report
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
