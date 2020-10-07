import { Grid, makeStyles, Typography } from "@material-ui/core"
import React from "react"
import Breadcrumbs from "../components/Breadcrumbs"
import Entries from "../components/Entries"
import Milestones from "../components/Milestones"
import Projects from "../components/Projects"
import Tasks from "../components/Tasks"
import { useSelector } from "react-redux"
import Overview from "../components/Overview"

const useStyles = makeStyles({
  projects: {
    backgroundColor: "#fafafa",
    width: "15vw",
    height: "95vh",
  },
  loading: {
    margin: "8vh 0 0 18vw",
  },
})

function DashBoard() {
  const classes = useStyles()
  // const dispatch = useDispatch()
  const currentProject = useSelector(state => state.projects.currentProject)
  const currentMilestone = useSelector(state => state.milestones.currentMilestone)
  const currentTask = useSelector(state => state.tasks.currentTask)
  const loadingProject = useSelector(state => state.projects.loadingProject)
  const loadingMilestone = useSelector(state => state.milestones.loadingMilestone)
  const loadingTask = useSelector(state => state.tasks.loadingTask)

  return (
    <Grid container wrap='nowrap'>
      <Grid item className={classes.projects}>
        <Projects />
      </Grid>
      <Grid item container direction='column' style={{ padding: "0 1vw" }}>
        <Breadcrumbs />
        {!!currentProject.id ? (
          <>
            {!!currentMilestone.id ? (
              <>
                {!!currentTask.id ? (
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
                {!!localStorage.currentProjectId ? (
                  <Typography variant='h6' className={classes.loading}>
                    Loading...
                  </Typography>
                ) : (
                  <Overview />
                )}
              </>
            )}
          </>
        )}
      </Grid>
    </Grid>
  )
}

export default DashBoard
