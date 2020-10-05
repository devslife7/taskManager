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
// import { Link } from "react-router-dom"
import { IconButton } from "@material-ui/core"
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos"
import { fetchCurrentTask } from "../actions/tasks"
// import moment from "moment"

const useStyles = makeStyles({
  table: {
    // minWidth: 650
  }
})

export default function TasksTable() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const currentMilestone = useSelector(state => state.milestones.currentMilestone)

  // const handleLink = () => {
  //   console.log("click task details")
  //   localStorage.currentTaskId = task.id
  // }

  const handleLink = taskId => {
    localStorage.currentTaskId = taskId
    dispatch(fetchCurrentTask())
  }

  const renderRows = () => {
    return currentMilestone.tasks.map((task, idx) => (
      <TableRow key={idx}>
        <TableCell component='th' scope='row'>
          {task.name}
          {/* <Link
            to='/task/details'
            onClick={() => (localStorage.currentTaskId = task.id)}
            style={{ marginLeft: "30px" }}
          >
            details
          </Link> */}
          <IconButton onClick={() => handleLink(task.id)}>
            <ArrowForwardIosIcon />
          </IconButton>
        </TableCell>
        <TableCell>{`${task.progress}%`}</TableCell>
        <TableCell>{"Owner"}</TableCell>
        <TableCell>{task.hours}</TableCell>
        {/* <TableCell>{moment.unix(task.start_date).format("ll").toString()}</TableCell>
        <TableCell>{moment.unix(task.end_date).format("ll").toString()}</TableCell> */}
        <TableCell>{task.notes}</TableCell>
      </TableRow>
    ))
  }
  // const renderRows = () => {
  //   return rows.map(row => (
  //     <TableRow key={row.name}>
  //       <TableCell component='th' scope='row'>
  //         {row.name}
  //       </TableCell>
  //       <TableCell align='right'>{row.calories}</TableCell>
  //       <TableCell align='right'>{row.fat}</TableCell>
  //       <TableCell align='right'>{row.carbs}</TableCell>
  //       <TableCell align='right'>{row.protein}</TableCell>
  //     </TableRow>
  //   ))
  // }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size='small' aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Progress%</TableCell>
            <TableCell>Owner</TableCell>
            <TableCell>Hours</TableCell>
            <TableCell>Start</TableCell>
            <TableCell>End</TableCell>
            <TableCell>Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderRows()}</TableBody>
      </Table>
    </TableContainer>
  )
}
