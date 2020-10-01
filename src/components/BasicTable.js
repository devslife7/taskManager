import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
})

export default function BasicTable() {
  const currentProject = useSelector(state => state.projects.currentProject)

  const classes = useStyles()

  // const handleLink = () => {
  //   console.log("click task details")
  //   localStorage.currentTaskId = task.id
  // }

  const renderRows = () => {
    return currentProject.tasks.map((task, idx) => (
      <TableRow key={idx}>
        <TableCell component='th' scope='row'>
          {task.name}
          <Link
            to='/task/details'
            onClick={() => (localStorage.currentTaskId = task.id)}
            style={{ marginLeft: "30px" }}
          >
            details
          </Link>
        </TableCell>
        <TableCell align='right'>{task.start_date}</TableCell>
        <TableCell align='right'>{task.end_date}</TableCell>
        <TableCell align='right'>{task.hours}</TableCell>
        <TableCell align='right'>{"Owner"}</TableCell>
        <TableCell align='right'>{task.completion_percentage}</TableCell>
        <TableCell align='right'>{task.notes}</TableCell>
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
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align='right'>Start Date</TableCell>
            <TableCell align='right'>End Date</TableCell>
            <TableCell align='right'>Hours</TableCell>
            <TableCell align='right'>Owner</TableCell>
            <TableCell align='right'>Progress %</TableCell>
            <TableCell align='right'>Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderRows()}</TableBody>
      </Table>
    </TableContainer>
  )
}
