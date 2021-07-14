import { Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import ProjectGraphs from './ProjectGraphs'

const useStyles = makeStyles({
  graph: {
    // backgroundColor: '#f4f4f4',
    margin: '0 auto',
  },
  boxesContainer: {
    margin: '5rem 0',
  },
  projectBox: {
    backgroundColor: '#f4f4f4',
    padding: '40px',
    fontSize: '1.6rem',
    textAlign: 'center',
    fontWeight: 300,
  },
  nextDeadline: {
    backgroundColor: '#f4f4f4',
    padding: '0 40px',
    fontSize: '1.4rem',
    textAlign: 'center',
    fontWeight: 300,
  },
})

export default function Dashboard() {
  const classes = useStyles()

  return (
    <>
      <Grid container direction='column'>
        <Grid item container justify='space-around' className={classes.boxesContainer}>
          <div className={classes.projectBox}>
            <div style={{ marginBottom: '10px' }}>Total Projects</div>
            <div>30</div>
          </div>
          <div className={classes.projectBox}>
            <div style={{ marginBottom: '10px' }}>Active Projects</div>
            <div>20</div>
          </div>
          <div className={classes.projectBox}>
            <div style={{ marginBottom: '10px' }}>Incative Projects</div>
            <div>10</div>
          </div>
          <div className={classes.nextDeadline}>
            <div style={{ margin: '15px 0', fontSize: '1.6rem' }}>Next Deadline</div>
            <div>July 4th, 2021</div>
            <div>Challenge Project</div>
          </div>
        </Grid>

        <div className={classes.graph}>
          <ProjectGraphs />
        </div>
      </Grid>
    </>
  )
}
