import { Grid } from "@material-ui/core"
import React from "react"
import Projects from "../components/Projects"

function DashBoard() {
  return (
    <Grid container>
      <Grid item style={{ width: "15vw" }}>
        <Projects />
      </Grid>
      <Grid item style={{ backgroundColor: "yellow", width: "30vw" }}>
        <div>Milestones</div>
      </Grid>
      <Grid item style={{ backgroundColor: "red", width: "30vw" }}>
        <div>Tasks</div>
      </Grid>
      <Grid item style={{ backgroundColor: "blue", width: "25vw" }}>
        <div>entries</div>
      </Grid>
    </Grid>
  )
}

export default DashBoard
