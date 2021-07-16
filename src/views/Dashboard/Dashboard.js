import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProjectGraphs from './ProjectGraphs'
import { Grid, makeStyles } from '@material-ui/core'
import { fetchProjects } from '../../redux/actions/projects'
import { fromUnixTime, format, getUnixTime } from 'date-fns'

const useStyles = makeStyles({
  graph: {
    // backgroundColor: '#f4f4f4',
    margin: '0 auto',
  },
  boxesContainer: {
    margin: '7rem 0',
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
  const dispatch = useDispatch()
  const allProjects = useSelector(state => state.projects.allProjects)
  const projectsCount = allProjects.length

  const todaysDate = getUnixTime(new Date()) // Today's date

  const activeProjects = allProjects.filter(proj => proj.end_date > todaysDate)

  const nextDeadline = activeProjects.sort((prev, curr) => prev.end_date - curr.end_date)[0]
  const activeProjectsCount = activeProjects.length
  const inactiveProjectsCount = allProjects.filter(proj => proj.end_date < todaysDate).length

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  console.log('all projects array: ', allProjects)

  return (
    <>
      <Grid container direction='column'>
        {console.log('renders Dashboard')}
        <Grid item container justify='space-around' className={classes.boxesContainer}>
          <div className={classes.projectBox}>
            <div style={{ marginBottom: '10px' }}>Total Projects</div>
            <div>{projectsCount}</div>
          </div>
          <div className={classes.projectBox}>
            <div style={{ marginBottom: '10px' }}>Active Projects</div>
            <div>{activeProjectsCount}</div>
          </div>
          <div className={classes.projectBox}>
            <div style={{ marginBottom: '10px' }}>Incative Projects</div>
            <div>{inactiveProjectsCount}</div>
          </div>
          <div className={classes.nextDeadline}>
            <div style={{ margin: '15px 0', fontSize: '1.6rem' }}>Next Deadline</div>

            {nextDeadline ? (
              <>
                <div>{nextDeadline && format(fromUnixTime(nextDeadline.end_date), 'PP')}</div>
                <div>{nextDeadline && nextDeadline.name}</div>
              </>
            ) : (
              <div> (No active projects) </div>
            )}
          </div>
        </Grid>

        <div className={classes.graph}>
          <ProjectGraphs />
        </div>
      </Grid>
    </>
  )
}
