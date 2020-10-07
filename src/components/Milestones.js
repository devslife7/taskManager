import { Button, Grid, makeStyles, Typography } from "@material-ui/core"
import React from "react"
import { useSelector } from "react-redux"
import MilestonesTable from "./MilestonesTable"
import AddIcon from "@material-ui/icons/Add"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import MilestonesGraph from "./MilestonesGraph"
import { fromUnixTime, format } from "date-fns"

const useStyles = makeStyles(theme => ({
  button: {
    textTransform: "none",
    color: "white",
    fontSize: "1rem",
    marginLeft: "10vw",
    marginTop: "2vh",
  },
  editButton: {
    textTransform: "none",
    fontSize: "1rem",
    color: "white",
    marginBotton: "1rem",
    backgroundColor: theme.palette.success.main,
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
  },
  removeButton: {
    textTransform: "none",
    fontSize: "1rem",
    color: "white",
    backgroundColor: theme.palette.error.main,
    marginLeft: "20px",

    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
}))

function Milestones() {
  const classes = useStyles()
  const currentProject = useSelector(state => state.projects.currentProject)

  return (
    <div style={{ padding: "0 50px", height: "90vh", overflow: "scroll" }}>
      <Grid container>
        <Grid item xs={10}>
          <Typography variant='h6' align='center'>
            {currentProject.description}
          </Typography>

          <Typography variant='subtitle1' align='center'>
            {format(fromUnixTime(currentProject.start_date), "PP")} -{" "}
            {format(fromUnixTime(currentProject.end_date), "PP")}
          </Typography>
          <Typography
            variant='subtitle1'
            align='center'>{`Progress: ${currentProject.progress}%`}</Typography>
        </Grid>
        <Grid item xs={2} container direction='column' alignItems='flex-end' justify='space-between'>
          <Button
            variant='contained'
            color='primary'
            startIcon={<DeleteIcon />}
            className={classes.removeButton}>
            Remove Project
          </Button>
          <Button variant='contained' color='primary' startIcon={<EditIcon />} className={classes.editButton}>
            Edit Project
          </Button>
        </Grid>
      </Grid>

      <Button variant='contained' color='primary' startIcon={<AddIcon />} className={classes.button}>
        Add Milestone
      </Button>

      <MilestonesTable />
      <MilestonesGraph />
    </div>
  )
}

export default Milestones
