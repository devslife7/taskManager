import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import { useDispatch, useSelector } from "react-redux"
import { IconButton } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos"
import { fetchCurrentTask } from "../actions/tasks"
import { fromUnixTime, format } from "date-fns"

const useStyles = makeStyles({
  table: {
    width: "65vw",
    marginTop: "1vh",
    marginLeft: "10vw",
  },
})

export default function TasksTable() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const currentMilestone = useSelector(state => state.milestones.currentMilestone)

  const handleLink = taskId => {
    localStorage.currentTaskId = taskId
    dispatch(fetchCurrentTask())
  }

  const renderRows = () => {
    return currentMilestone.tasks.map((task, idx) => (
      <TableRow key={idx}>
        <TableCell component='th' scope='row'>
          {task.name}
        </TableCell>
        <TableCell align='right'>{`${task.progress}%`}</TableCell>
        <TableCell align='right'>{"Owner"}</TableCell>
        <TableCell align='right'>{task.hours}</TableCell>
        <TableCell align='right'>{format(fromUnixTime(task.start_date), "PP")}</TableCell>
        <TableCell align='right'>{format(fromUnixTime(task.end_date), "PP")}</TableCell>
        <TableCell align='right'>{task.notes}</TableCell>

        <TableCell align='right'>
          <IconButton>
            <EditIcon fontSize='small' color='primary' />
          </IconButton>
          <IconButton>
            <DeleteIcon fontSize='small' color='error' />
          </IconButton>
          <IconButton onClick={() => handleLink(task.id)}>
            <ArrowForwardIosIcon fontSize='small' />
          </IconButton>
        </TableCell>
      </TableRow>
    ))
  }

  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table size='small' aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Tasks</TableCell>
            <TableCell align='right'>Progress%</TableCell>
            <TableCell align='right'>Owner</TableCell>
            <TableCell align='right'>Hours</TableCell>
            <TableCell align='right'>Start</TableCell>
            <TableCell align='right'>End</TableCell>
            <TableCell align='right'>Notes</TableCell>
            <TableCell align='right'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderRows()}</TableBody>
      </Table>
    </TableContainer>
  )
}
