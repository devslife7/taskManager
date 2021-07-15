import { Button, Grid, ListItemText, makeStyles, Paper, Typography } from '@material-ui/core'
import { format } from 'date-fns'
// import { useStyles } from '@material-ui/pickers/views/Calendar/Day'
import React from 'react'

const useStyles = makeStyles(theme => ({
  ListItem: {
    padding: '1.2rem 2.2vw',
    width: '13rem',
    backgroundColor: '#fff',
  },
}))

export default function ReportCard({ report }) {
  const classes = useStyles()
  return (
    <>
      <Paper className={classes.ListItem} elevation={4}>
        <Grid container direction='column'>
          <Grid item>
            <ListItemText primary={report.title} />
          </Grid>
          <Grid item container justify='space-between'>
            <Typography variant='subtitle2' color='textSecondary' gutterBottom>
              Created: {format(new Date(report.created_at), 'p PP')}
            </Typography>
          </Grid>
          <Button
            variant='contained'
            color='primary'
            // onClick={handleSetCurrentProject}
            style={{ marginTop: '15px' }}
          >
            Details
          </Button>
        </Grid>
      </Paper>
    </>
  )
}
