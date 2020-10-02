import { Grid } from "@material-ui/core"
import React from "react"
import Milestones from "../components/Milestones"
import Projects from "../components/Projects"
import Tasks from "../components/Tasks"

function DashBoard() {
  return (
    <Grid container>
      <Grid item style={{ width: "12vw" }}>
        <Projects />
      </Grid>
      <Grid item style={{ backgroundColor: "white", width: "32vw" }}>
        <Milestones />
      </Grid>
      <Grid item style={{ width: "32vw" }}>
        <Tasks />
      </Grid>
      <Grid item style={{ backgroundColor: "white", width: "24vw" }}>
        <div>entries</div>
      </Grid>
    </Grid>
  )
}

export default DashBoard
