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
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos"
import { fetchCurrentTask } from "../actions/tasks"
import { fromUnixTime, format } from "date-fns"
import DateFnsUtils from "@date-io/date-fns"
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"

const useStyles = makeStyles(theme => ({
  table: {
    width: "65vw",
    marginTop: "1vh",
    marginLeft: "10vw",
  },
  editIcon: {
    color: theme.palette.success.main,
  },
  button: {
    textTransform: "none",
    fontSize: "1rem",
    marginLeft: "10vw",
  },
  KeyboardDatePicker: {
    width: "140px",
  },
  DialogContent: {
    height: "350px",
    width: "350px",
  },
  removeButton: {
    textTransform: "none",
    fontSize: "1rem",
    color: "white",
    backgroundColor: theme.palette.error.main,

    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
}))

export default function TasksTable() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const currentMilestone = useSelector(state => state.milestones.currentMilestone)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [name, setName] = useState("")
  const [hours, setHours] = useState()
  const [notes, setNotes] = useState("")
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [currentTask, setCurrentTask] = useState({ name: "" })

  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false)
  const handleCloseEditDialog = () => setOpenEditDialog(false)
  const handleSetStartDate = date => setStartDate(date)
  const handleSetEndDate = date => setEndDate(date)

  const handleOpenDeleteDialog = task => {
    setOpenDeleteDialog(true)
    setCurrentTask(task)
  }
  const handleOpenEditDialog = task => {
    setName(task.name)
    setHours(task.hours)
    setNotes(task.notes)
    setStartDate(fromUnixTime(task.start_date))
    setEndDate(fromUnixTime(task.end_date))
    setOpenEditDialog(true)
  }

  const handleDeleteConfirm = () => {
    console.log("Confirms delete task")
    // dispatch(deleteEntryFetch(currentTask.id))
    handleCloseDeleteDialog()
  }
  const handleEditDialogSubmit = () => {
    console.log("submits edit dialog")
    handleCloseEditDialog()
  }

  const handleLink = taskId => {
    localStorage.setItem("currentTaskId", `${taskId}`)
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
          <IconButton onClick={() => handleOpenEditDialog(task)}>
            <EditIcon fontSize='small' className={classes.editIcon} />
          </IconButton>
          <IconButton onClick={() => handleOpenDeleteDialog(task)}>
            <DeleteIcon fontSize='small' color='error' className={classes.deleteIcon} />
          </IconButton>
          <IconButton onClick={() => handleLink(task.id)}>
            <ArrowForwardIosIcon fontSize='small' color='primary' />
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

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle disableTypography>
          <Typography variant='h5'>Deleting Task: {`${currentTask.name}`}</Typography>
        </DialogTitle>
        <DialogContent>
          {"Are you sure you want to delete this Task?\nThis action cannot be undone."}
        </DialogContent>

        <DialogActions>
          <Button variant='outlined' className={classes.button} onClick={handleCloseDeleteDialog}>
            Cancel
          </Button>
          <Button variant='contained' className={classes.removeButton} onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <Typography variant='h5' style={{ marginTop: "20px", marginLeft: "20px" }}>
          {"Edit Task"}
        </Typography>

        <DialogContent className={classes.DialogContent}>
          <TextField
            label='Name'
            variant='outlined'
            margin='normal'
            fullWidth
            value={name}
            onChange={e => {
              setName(e.target.value)
            }}
          />
          <TextField
            label='Hours'
            variant='outlined'
            margin='normal'
            fullWidth
            value={hours}
            onChange={e => {
              setHours(e.target.value)
            }}
          />
          <TextField
            label='Notes'
            variant='outlined'
            margin='normal'
            fullWidth
            multiline
            rows={2}
            value={notes}
            onChange={e => {
              setNotes(e.target.value)
            }}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify='space-around'>
              <KeyboardDatePicker
                label='Start Date'
                disableToolbar
                autoOk
                variant='inline'
                format='MM/dd/yyyy'
                margin='normal'
                id='date-picker-inline'
                value={startDate}
                onChange={handleSetStartDate}
                className={classes.KeyboardDatePicker}
              />
              <KeyboardDatePicker
                label='End Date'
                disableToolbar
                autoOk
                variant='inline'
                format='MM/dd/yyyy'
                margin='normal'
                id='date-picker-inline'
                value={endDate}
                onChange={handleSetEndDate}
                className={classes.KeyboardDatePicker}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </DialogContent>

        <DialogActions>
          <Button
            variant='outlined'
            className={classes.button}
            onClick={handleCloseEditDialog}
            color='primary'
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            className={classes.button}
            onClick={handleEditDialogSubmit}
            color='primary'
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
