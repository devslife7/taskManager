import { Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import ProjectGraphs from './ProjectGraphs'

const useStyles = makeStyles({
  graph: {
    backgroundColor: '#f4f4f4',
  },
  totalProjectsBox: {
    backgroundColor: 'red',
  },
  activeProjectsBox: {
    backgroundColor: 'green',
  },
  inactiveProjectsBox: {
    backgroundColor: 'yellow',
  },
  nextDeadline: {
    backgroundColor: 'pink',
  },
})

export default function Dashboard() {
  const classes = useStyles()

  return (
    <>
      <Grid container direction='column'>
        <Grid item container justify='space-around'>
          <div className={classes.totalProjectsBox}>Total Projects</div>
          <div className={classes.activeProjectsBox}>Active Projects</div>
          <div className={classes.inactiveProjectsBox}>Incative Projects</div>
          <div className={classes.nextDeadline}>Next Deadline</div>
        </Grid>

        <div className={classes.graph}>
          <ProjectGraphs />
        </div>
      </Grid>
    </>
  )
}
