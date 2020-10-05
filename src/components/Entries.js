import { Button, IconButton, makeStyles, Typography } from "@material-ui/core"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { fetchCurrentMilestone } from "../actions/milestones"
import AddIcon from "@material-ui/icons/Add"
import CreateIcon from "@material-ui/icons/Create"
import { fetchCurrentTask } from "../actions/tasks"
import EntriesTable from "./EntriesTable"
import { fromUnixTime, format } from "date-fns"

const useStyles = makeStyles(theme => ({
  button: {
    textTransform: "none",
    fontSize: "1rem",
    backgroundColor: "#2b9af7",
    marginLeft: "10vw",
    marginTop: "2vh",
  },
}))

function Entries() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const currentTask = useSelector(state => state.tasks.currentTask)

  useEffect(() => {
    !!localStorage.currentTaskId && dispatch(fetchCurrentTask())
  }, [dispatch])

  return (
    <div style={{ padding: "0 50px", height: "90vh", overflow: "scroll" }}>
      <>
        <Typography variant='h6' align='center'>
          {currentTask.notes}
        </Typography>
        <Typography variant='subtitle1' align='center'>
          {format(fromUnixTime(currentTask.start_date), "PP")} -{" "}
          {format(fromUnixTime(currentTask.end_date), "PP")}
        </Typography>
        <Typography variant='subtitle1' align='center'>{`Progress: ${currentTask.progress}%`}</Typography>
        <Typography variant='subtitle1' align='center'>{`Hours: ${currentTask.hours}`}</Typography>
        <Typography variant='subtitle1' align='center'>{`Owner(s): Owner`}</Typography>

        <Button variant='contained' color='secondary' startIcon={<AddIcon />} className={classes.button}>
          Add Entry
        </Button>

        <EntriesTable />
      </>
    </div>
  )
}

export default Entries
