import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import { useDispatch, useSelector } from "react-redux"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import { fromUnixTime, format } from "date-fns"
import { deleteEntryFetch } from "../actions/tasks"

const useStyles = makeStyles(theme => ({
  table: {
    width: "45vw",
    marginTop: "1vh",
    marginLeft: "10vw",
  },
  editIcon: {
    color: theme.palette.success.main,
  },
}))

export default function EntriesTable() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const currentTask = useSelector(state => state.tasks.currentTask)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  const handleOpenDeleteDialog = () => setOpenDeleteDialog(true)
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false)

  const handleDelete = entryId => {
    window.confirm("Press a button!")
    // handleOpenDeleteDialog()
    // dispatch(deleteEntryFetch(entryId))
  }

  const renderRows = () => {
    return currentTask.entries.map((entry, idx) => (
      <TableRow key={idx}>
        <TableCell>{"owner"}</TableCell>
        <TableCell align='right'>{`${entry.progress}%`}</TableCell>
        <TableCell align='right' component='th' scope='row'>
          {format(fromUnixTime(entry.date), "PP")}
        </TableCell>
        <TableCell align='right'>{entry.notes}</TableCell>

        <TableCell align='right'>
          <IconButton>
            <EditIcon fontSize='small' className={classes.editIcon} />
          </IconButton>
          <IconButton onClick={() => handleDelete(entry.id)}>
            <DeleteIcon fontSize='small' color='error' />
          </IconButton>
        </TableCell>
      </TableRow>
    ))
  }

  return (
    <>
      <TableContainer component={Paper} className={classes.table}>
        <Table size='small' aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Owner</TableCell>
              <TableCell align='right'>Progress%</TableCell>
              <TableCell align='right'>Date</TableCell>
              <TableCell align='right'>Notes</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderRows()}</TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>{"deleting this entry"}</DialogTitle>

        <DialogActions>
          <Button
            variant='contained'
            className={classes.button}
            onClick={handleCloseDeleteDialog}
            color='primary'>
            Cancel
          </Button>
          <Button
            variant='contained'
            className={classes.button}
            onClick={handleCloseDeleteDialog}
            color='primary'>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
