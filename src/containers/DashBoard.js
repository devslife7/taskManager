import { Grid, makeStyles, Typography } from "@material-ui/core"
import React from "react"
import Breadcrumbs from "../components/Breadcrumbs"
import Entries from "../components/entries/Entries"
import Milestones from "../components/milestones/Milestones"
import Projects from "../components/projects/Projects"
import Tasks from "../components/tasks/Tasks"
import { useSelector } from "react-redux"
import Overview from "../components/projects/Overview"
import OverviewGraph from "../components/projects/OverviewGraph"

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
    <Grid container wrap='nowrap' style={{ width: "1000px", backgroundColor: "fafafa" }}>
      <Grid item container direction='column' style={{ padding: "0 1vw" }}>
        <div>Dashboard coming soon</div>
      </Grid>
    </Grid>
  )
}

export default DashBoard
