import { Grid, makeStyles } from "@material-ui/core"
import React from "react"
import Entries from "../components/Entries"
import Milestones from "../components/Milestones"
import Projects from "../components/Projects"
import Tasks from "../components/Tasks"

const useStyles = makeStyles({
  projects: {
    backgroundColor: "#E1F0FA",
    minWidth: "12vw",
    maxWidth: "40vw",
    padding: "1rem"
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

  return (
    <Grid container justify='space-evenly' wrap='nowrap'>
      <Grid item className={classes.projects}>
        <Projects />
      </Grid>
      <Grid item className={classes.milestones}>
        <Milestones />
      </Grid>
      <Grid item className={classes.tasks}>
        <Tasks />
      </Grid>
      <Grid item className={classes.entries}>
        <Entries />
      </Grid>
    </Grid>
  )
}

export default DashBoard
