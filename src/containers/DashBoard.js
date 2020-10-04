import { Grid, makeStyles } from "@material-ui/core"
import React from "react"
import SimpleBreadcrumbs from "../components/SimpleBreadcrumbs"
import Entries from "../components/Entries"
import Milestones from "../components/Milestones"
import Projects from "../components/Projects"
import Tasks from "../components/Tasks"
import { useSelector } from "react-redux"
import Overview from "../components/Overview"

const useStyles = makeStyles({
  projects: {
    backgroundColor: "#E1F0FA",
    width: "15vw",
    height: "95vh"
  },
  milestones: {
    backgroundColor: "#fafafa",
    minWidth: "32vw",
    padding: "1rem"
  },
  tasks: {
    backgroundColor: "#E1F0FA",
    minWidth: "32vw",
    padding: "1rem"
  },
  entries: {
    backgroundColor: "#fafafa",
    minWidth: "24vw",
    padding: "1rem"
  }
})

function DashBoard() {
  const classes = useStyles()
  const currentProject = useSelector(state => state.projects.currentProject)
  const currentMilestone = useSelector(state => state.milestones.currentMilestone)
  const currentTask = useSelector(state => state.tasks.currentTask)

  return (
    <Grid container>
      <Grid item className={classes.projects}>
        <Projects />
      </Grid>
      {!!currentProject.id ? (
        // <Grid item className={classes.milestones}>
        <>
          <SimpleBreadcrumbs />
          <Milestones />
        </>
      ) : (
        <Overview />
      )}
      {/* {!!currentMilestone.id && (
        <Grid item className={classes.tasks}>
          <Tasks />
        </Grid>
      )}
      {!!currentTask.id && (
        <Grid item className={classes.entries}>
          <Entries />
        </Grid>
      )} */}
    </Grid>
  )
}

export default DashBoard
