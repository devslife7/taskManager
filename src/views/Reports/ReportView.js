import React, { useEffect } from 'react'
import { Button, Divider, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCurrentReport } from '../../actions/user'
import { getUnixTime } from 'date-fns'

const useStyles = makeStyles(() => ({
  backBtn: {
    fontSize: '1.2rem',
    margin: '1rem 0 0 10rem',
  },
  reportPaper: {
    margin: '1rem 10rem',
    height: '62rem',
    width: '45rem',
  },
  reportTitle: {
    margin: '2rem 0',
    textAlign: 'center',
    fontWeight: 300,
  },
  detailsContainer: {
    backgroundColor: '#f4f4f4',
    padding: '1rem 3rem',
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

          <div className={classes.detailsContainer}>
            <div>Status: {projectStatus(reportProj)}</div>
            <div>Progress: {reportProj.progress}</div>
            <div>Description: {reportProj.description}</div>
          </div>

          <Divider />

          <div className={classes.detailsContainer}>
            <div>Project id: {reportProj.id}</div>
            <div>Project Created: {reportProj.created_at}</div>
            <div>Project Start: {reportProj.start_date}</div>
            <div>Project Lasted Update: {reportProj.updated_at}</div>
            <div>Project Deadline: {reportProj.end_date}</div>
          </div>

          <Divider />

          <div className={classes.detailsContainer}>
            <div>
              Report Owner: {currentUser.first_name} {currentUser.last_name}
            </div>
            <div>Report Created: {currentReport.created_at}</div>
            <div>Report Owner Notes: {currentReport.notes}</div>
          </div>
        </Paper>
      </Grid>
    </>
  )
}
