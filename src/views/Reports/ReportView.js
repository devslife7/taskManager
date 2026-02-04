import React from 'react'
import { Button, Divider, Grid, Paper, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useDispatch, useSelector } from 'react-redux'
import { deleteReportFetch } from '../../redux/actions/user'
import { fromUnixTime, parseISO, format, isFuture, intervalToDuration, formatDuration } from 'date-fns'
import ReportTable from './ReportTable'

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

  // useEffect(() => {
  //   dispatch(fetchCurrentReport(6))
  // }, [dispatch]) // temp auto fetch of report id: 6

  const timeUntilProjectDeadline = () => {
    const duration = intervalToDuration({
      start: fromUnixTime(reportProj.end_date),
      end: new Date(),
    })

    delete duration.hours
    delete duration.minutes
    delete duration.seconds

    return formatDuration(duration, { delimiter: ', ' })
  }

  const isProjectActive = () => isFuture(fromUnixTime(reportProj.end_date))

  const handleDeleteReport = () => {
    const message = 'Are you sure you want to delete the current report?\nThis action can not be undone.'

    if (window.confirm(message)) {
      // make a delete request and update redux
      dispatch(deleteReportFetch(currentReport.id))
      handleExitReportView()
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
            <div>Status: {isProjectActive() ? 'Active' : 'Inactive'}</div>
            <div>Progress: {reportProj.progress}%</div>
            <div>Time until deadline: {isProjectActive() ? timeUntilProjectDeadline() : 'Past deadline'}</div>
            <div>Description: {reportProj.description}</div>
          </div>

          <Divider />

          <div className={classes.detailsContainer}>
            <div>Project id: {reportProj.id}</div>
            <div>Project Created: {format(parseISO(reportProj.created_at), "PPPP ' at ' p")}</div>
            <div>Project Laste Update: {format(parseISO(reportProj.updated_at), "PPPP ' at ' p")}</div>
            <div>Project Start: {format(fromUnixTime(reportProj.start_date), 'PP')}</div>
            <div>Project Deadline: {format(fromUnixTime(reportProj.end_date), 'PP')}</div>
          </div>

          <Divider />

          <div className={classes.detailsContainer}>
            <div>
              Report Owner: {currentUser.first_name} {currentUser.last_name}
            </div>
            <div>Report Created: {format(parseISO(currentReport.created_at), "PPPP ' at ' p")}</div>
            <div>Report Owner Notes: {currentReport.notes}</div>
          </div>

          <Divider />

          <ReportTable milestones={reportProj.milestones} />
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
