import { Button, Grid, makeStyles, Typography } from "@material-ui/core"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import MilestonesTable from "./MilestonesTable"
import AddIcon from "@material-ui/icons/Add"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"
// import CreateIcon from "@material-ui/icons/Create"
import MilestonesGraph from "./MilestonesGraph"
import { fromUnixTime, format } from "date-fns"

const useStyles = makeStyles(theme => ({
  button: {
    textTransform: "none",
    fontSize: "1rem",
    backgroundColor: "#2b9af7",
    marginLeft: "10vw",
    marginTop: "2vh",
  },
  editButton: {
    textTransform: "none",
    // margin: "5vh 0 0 10vw",
    fontSize: "1rem",
    // backgroundColor: "#2b9af7",
    backgroundColor: "green",
  },
  removeButton: {
    textTransform: "none",
    // margin: "5vh 0 0 10vw",
    fontSize: "1rem",
    backgroundColor: "red",
    marginLeft: "20px",
  },
}))

function Milestones() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const currentProject = useSelector(state => state.projects.currentProject)

  return (
    <div style={{ padding: "0 50px", height: "90vh", overflow: "scroll" }}>
      <Grid container>
        <Grid item xs={8}>
          <Typography variant='h6'>{currentProject.description}</Typography>
        </Grid>
        <Grid item xs={4} container direction='column' alignItems='flex-end'>
          <Grid item style={{ padding: "0", marginBottom: "20px" }}>
            <Button
              variant='contained'
              color='secondary'
              startIcon={<AddIcon />}
              className={classes.editButton}>
              Edit Project
            </Button>
            <Button
              variant='contained'
              color='secondary'
              startIcon={<DeleteForeverIcon />}
              className={classes.removeButton}>
              Remove Project
            </Button>
          </Grid>
          <Typography variant='subtitle1' align='right'>
            {format(fromUnixTime(currentProject.start_date), "PP")} -{" "}
            {format(fromUnixTime(currentProject.end_date), "PP")}
          </Typography>
          <Typography variant='subtitle1' align='right'>{`Progress: ${currentProject.progress}%`}</Typography>
        </Grid>
      </Grid>

      <Button variant='contained' color='secondary' startIcon={<AddIcon />} className={classes.button}>
        Add Milestone
      </Button>

      <MilestonesTable />
      <MilestonesGraph />
    </div>
  )
}

export default Milestones
