import { Button, Grid, ListItemText, makeStyles, Paper, Typography } from '@material-ui/core'
import { format, parseISO } from 'date-fns'
// import { useStyles } from '@material-ui/pickers/views/Calendar/Day'
import React from 'react'
import { useDispatch } from 'react-redux'
import { fetchCurrentReport } from '../../redux/actions/user'

const useStyles = makeStyles(theme => ({
  ListItem: {
    padding: '1.2rem 2.2vw',
    width: '13rem',
    backgroundColor: '#fff',
  },
}))

export default function ReportCard({ report, handleEnterReportView }) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const handleSetCurrentReport = () => {
    handleEnterReportView()
    // fetch current report and current report to redux

    dispatch(fetchCurrentReport(report.id))
  }

  return (
    <>
      <Paper className={classes.ListItem} elevation={4}>
        <Grid container direction='column'>
          <Grid item>
            <ListItemText primary={report.title} />
          </Grid>
          <Grid item container justifyContent='space-between'>
            <Typography variant='subtitle2' color='textSecondary' gutterBottom>
              Created: {format(parseISO(report.created_at), 'p PP')}
            </Typography>
          </Grid>
          <Button
            variant='contained'
            color='primary'
            onClick={handleSetCurrentReport}
            style={{ marginTop: '15px' }}
          >
            Details
          </Button>
        </Grid>
      </Paper>
    </>
  )
}
