import { Button, Grid, InputAdornment, makeStyles, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjects } from '../../redux/actions/projects'
import ProjectCard from './ProjectCard'
import SearchIcon from '@material-ui/icons/Search'
import AddIcon from '@material-ui/icons/Add'
import Breadcrumbs from './Breadcrumbs'
import Tasks from './tasks/Tasks'
import Entries from './entries/Entries'
import Milestones from './milestones/Milestones'
import ProjectDialog from './ProjectDialog'

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: '#fafafa',
    padding: '0px 2vw',
    width: '100%',
    height: '100vh',
    overflow: 'scroll',
  },
  searchBox: {
    margin: '8em 0 2rem 7rem',
    width: '16rem',
  },
  projectCards: {
    margin: '0 0 0 6rem',
  },
  // addProject: {
  //   padding: '1.2rem 2.2vw',
  //   width: '13rem',
  //   textAlign: 'center',
  //   fontSize: '5rem',
  //   fontWeight: '200',
  //   color: '#2196f3',
  //   height: '6.8rem',
  //   transition: '0.4s all ease',

  //   '&:hover': {
  //     backgroundColor: '#f4f4f4',
  //     cursor: 'pointer',
  //   },
  // },
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

  const [openDialog, setOpenDialog] = useState(false)
  const handleOpenDialog = () => setOpenDialog(true)
  const handleCloseDialog = () => {
    setOpenDialog(false)
    // setImportFile("")
    // setDisplayImport(false)
  }

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  const renderProjects = () => {
    const filterProjects = allProjects.filter(proj =>
      proj.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    filterProjects.sort((a, b) => a.id - b.id) // Sorts Projects by id so the newest one shows

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
      {console.log('render projects')}
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
                    <Grid container justifyContent='space-between'>
                      <Grid item>
                        <TextField
                          value={searchTerm}
                          onChange={event => setSearchTerm(event.target.value)}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='start'>
                                <SearchIcon />
                              </InputAdornment>
                            ),
                          }}
                          className={classes.searchBox}
                          label='Search Projects'
                        />
                      </Grid>

                      <Grid item style={{ margin: '8rem 12rem 0 0' }}>
                        <Button
                          variant='contained'
                          color='primary'
                          startIcon={<AddIcon style={{ fontSize: '1.5rem' }} />}
                          style={{ fontSize: '1.2rem' }}
                          onClick={handleOpenDialog}
                        >
                          Add Project
                        </Button>
                      </Grid>
                    </Grid>

                    <ProjectDialog open={openDialog} onClose={handleCloseDialog} />

                    {loadingProject ? (
                      <Typography variant='h1' style={{ fontSize: '1.3em', marginTop: '90px' }}>
                        Loading...
                      </Typography>
                    ) : (
                      <Grid container spacing={5} className={classes.projectCards}>
                        {renderProjects()}
                        {/* <Grid item>
                          <Paper className={classes.addProject} elevation={4}>
                            +
                          </Paper>
                        </Grid>  // add Button that looks like a Project Card*/}
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
