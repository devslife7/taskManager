import { Grid, InputAdornment, makeStyles, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjects } from '../../actions/projects'
import ProjectCard from './ProjectCard'
import SearchIcon from '@material-ui/icons/Search'
import Breadcrumbs from './Breadcrumbs'
import Tasks from '../../components/tasks/Tasks'
import Entries from '../../components/entries/Entries'
import Milestones from '../../components/milestones/Milestones'

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: '#fafafa',
    // backgroundColor: "yellow",
    padding: '0px 100px',
    width: '100%',
    height: '100vh',
    overflow: 'scroll',
  },
  searchBox: {
    margin: '0 0 1rem 0',
    width: '12rem',
  },
  loading: {
    margin: '8vh 0 0 18vw',
  },
}))

export default function Projects() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const currentProject = useSelector(state => state.projects.currentProject)
  const currentMilestone = useSelector(state => state.milestones.currentMilestone)
  const currentTask = useSelector(state => state.tasks.currentTask)
  const loadingProject = useSelector(state => state.projects.loadingProject)
  const loadingMilestone = useSelector(state => state.milestones.loadingMilestone)
  const loadingTask = useSelector(state => state.tasks.loadingTask)
  const allProjects = useSelector(state => state.projects.allProjects)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  const renderProjects = () => {
    const filterProjects = allProjects.filter(proj =>
      proj.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    filterProjects.sort((a, b) => b.end_date - a.end_date) // Sorts Projects by end_date

    return filterProjects
      .map((proj, idx) => (
        <Grid item key={idx}>
          <ProjectCard project={proj} />
        </Grid>
      ))
      .reverse()
  }

  return (
    <div className={classes.container}>
      <Grid container direction='column'>
        {currentProject.id ? (
          <>
            <Breadcrumbs />
            {currentMilestone.id ? (
              <>
                {currentTask.id ? (
                  <Entries />
                ) : (
                  <>
                    {loadingTask ? (
                      <Typography variant='h6' className={classes.loading}>
                        Loading...
                      </Typography>
                    ) : (
                      <Tasks />
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                {loadingMilestone ? (
                  <Typography variant='h6' className={classes.loading}>
                    Loading...
                  </Typography>
                ) : (
                  <Milestones />
                )}
              </>
            )}
          </>
        ) : (
          <>
            {loadingProject ? (
              <Typography variant='h6' className={classes.loading}>
                Loading...
              </Typography>
            ) : (
              <>
                {localStorage.getItem('currentProjectId') ? (
                  <Typography variant='h6' className={classes.loading}>
                    Loading...
                  </Typography>
                ) : (
                  <>
                    <TextField
                      value={searchTerm}
                      onChange={event => setSearchTerm(event.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment>
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                      className={classes.searchBox}
                      label='Search Projects'
                    />
                    {loadingProject ? (
                      <Typography variant='h1' style={{ fontSize: '1.3em', marginTop: '90px' }}>
                        Loading...
                      </Typography>
                    ) : (
                      <Grid container spacing={5}>
                        {renderProjects()}
                      </Grid>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </Grid>
    </div>
  )
}
