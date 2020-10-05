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
import { IconButton } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos"
import { fromUnixTime, format } from "date-fns"

const useStyles = makeStyles({
  table: {
    width: "65vw",
    marginTop: "1vh",
    marginLeft: "10vw",
  },
})

export default function EntriesTable() {
  const classes = useStyles()
  const currentTask = useSelector(state => state.tasks.currentTask)

  // const handleDelete = entryId => {
  //   const entriesURL = "http://localhost:3000/entries/"

  //   fetch(entriesURL + entryId, { method: "DELETE" })
  //     .then(resp => resp.json())
  //     .then(data => console.log(data))
  // }

  const renderRows = () => {
    return currentTask.entries.map((entry, idx) => (
      <TableRow key={idx}>
        <TableCell component='th' scope='row'>
          {format(fromUnixTime(entry.date), "PP")}
        </TableCell>
        <TableCell align='right'>{`${entry.progress}%`}</TableCell>
        <TableCell align='right'>{"owner"}</TableCell>
        <TableCell align='right'>{entry.notes}</TableCell>

        <TableCell align='right'>
          <IconButton>
            <EditIcon fontSize='small' color='primary' />
          </IconButton>
          <IconButton>
            <DeleteIcon fontSize='small' color='error' />
          </IconButton>
        </TableCell>

        {/* <TableCell align='right'>{entry.created_at}</TableCell>
        <TableCell align='right'>{entry.updated_at}</TableCell> */}
        {/* <TableCell align='right'>
          <IconButton>
            <EditIcon color='primary' />
          </IconButton>
          <IconButton onClick={() => handleDelete(entry.id)}>
            <DeleteIcon color='error' />
          </IconButton>
        </TableCell> */}
      </TableRow>
    ))
  }

  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table size='small' aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align='right'>Progress%</TableCell>
            <TableCell align='right'>Owner</TableCell>
            <TableCell align='right'>Notes</TableCell>
            <TableCell align='right'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderRows()}</TableBody>
      </Table>
    </TableContainer>
  )
}
