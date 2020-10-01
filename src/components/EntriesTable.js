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
import { Button, IconButton } from "@material-ui/core"

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
})

export default function EntriesTable() {
  const classes = useStyles()
  const currentTask = useSelector(state => state.tasks.currentTask)

  // const handleLink = () => {
  //   console.log("click task details")
  //   localStorage.currentTaskId = task.id
  // }

  const renderRows = () => {
    return currentTask.entries.map((entry, idx) => (
      <TableRow key={idx}>
        <TableCell component='th' scope='row'>
          {entry.date}
        </TableCell>
        <TableCell align='right'>{entry.completion_percentage}</TableCell>
        <TableCell align='right'>{"owner"}</TableCell>
        <TableCell align='right'>{entry.notes}</TableCell>
        <TableCell align='right'>{entry.created_at}</TableCell>
        <TableCell align='right'>{entry.updated_at}</TableCell>
        <TableCell align='right'>
          {/* <IconButton onClick={handleDelete}>
            <DeleteIcon color='error' />
          </IconButton> */}
        </TableCell>
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
            {/* <TableCell>Name</TableCell> */}
            <TableCell>Date</TableCell>
            <TableCell align='right'>Progress %</TableCell>
            <TableCell align='right'>Owner</TableCell>
            <TableCell align='right'>Notes</TableCell>
            <TableCell align='right'>Created At</TableCell>
            <TableCell align='right'>Updated At</TableCell>
            <TableCell align='right'>Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderRows()}</TableBody>
      </Table>
    </TableContainer>
  )
}
