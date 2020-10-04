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
// import { IconButton } from "@material-ui/core"
// import DeleteIcon from "@material-ui/icons/Delete"
// import EditIcon from "@material-ui/icons/Edit"
import moment from "moment"

const useStyles = makeStyles({
  table: {
    // minWidth: 650
  }
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
          {/* {entry.date} */}
          {moment.unix(entry.date).format("ll").toString()}
        </TableCell>
        <TableCell>{`${entry.progress}%`}</TableCell>
        <TableCell>{"owner"}</TableCell>
        <TableCell>{entry.notes}</TableCell>
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
    <TableContainer component={Paper}>
      <Table className={classes.table} size='small' aria-label='simple table'>
        <TableHead>
          <TableRow>
            {/* <TableCell>Name</TableCell> */}
            <TableCell>Date</TableCell>
            <TableCell>Progress%</TableCell>
            <TableCell>Owner</TableCell>
            <TableCell>Notes</TableCell>
            {/* <TableCell align='right'>Created At</TableCell>
            <TableCell align='right'>Updated At</TableCell> */}
            {/* <TableCell align='right'>Options</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>{renderRows()}</TableBody>
      </Table>
    </TableContainer>
  )
}
