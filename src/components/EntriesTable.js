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
  Slider,
  TextField,
  Typography,
} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import { fromUnixTime, format } from "date-fns"
import DateFnsUtils from "@date-io/date-fns"
import { deleteEntryFetch } from "../actions/tasks"
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"

const useStyles = makeStyles(theme => ({
  table: {
    width: "45vw",
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
    marginTop: 0,
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

export default function EntriesTable() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const currentTask = useSelector(state => state.tasks.currentTask)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [currentEntry, setCurrentEntry] = useState({})
  const [openEditDialog, setOpenEditDialog] = useState(false)

  const [sliderValue, setSliderValue] = useState(80)
  const [date, setDate] = useState()
  const [notes, setNotes] = useState("")

  const handleSliderChange = (e, newValue) => {
    setSliderValue(newValue)
  }

  const handleEditSubmit = () => {
    console.log("Edit Submits")
    handleCloseEditDialog()
  }

  const handleOpenEditDialog = entry => {
    setSliderValue(entry.progress)
    setNotes(entry.notes)
    setDate(fromUnixTime(entry.date))

    setOpenEditDialog(true)
  }
  const handleCloseEditDialog = () => setOpenEditDialog(false)
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false)

  const handleOpenDeleteDialog = entry => {
    setOpenDeleteDialog(true)
    setCurrentEntry(entry)
  }
  const handleOk = () => {
    dispatch(deleteEntryFetch(currentEntry.id))
    handleCloseDeleteDialog()
  }

  const marks = [
    { value: 5, label: "5%" },
    { value: 25, label: "25%" },
    { value: 50, label: "50%" },
    { value: 75, label: "75%" },
    { value: 100, label: "100%" },
  ]

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
          <IconButton onClick={() => handleOpenEditDialog(entry)}>
            <EditIcon fontSize='small' className={classes.editIcon} />
          </IconButton>
          <IconButton onClick={() => handleOpenDeleteDialog(entry)}>
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
        <DialogTitle disableTypography>
          <Typography variant='h5'>
            Deleting Entry: {!!currentEntry.date && format(fromUnixTime(currentEntry.date), "PP")}
            {/* Deleting Entry: {console.log(currentEntry.date)} */}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {"Are you sure you want to delete this Entry?\nThis action cannot be undone."}
        </DialogContent>

        <DialogActions>
          <Button variant='outlined' className={classes.button} onClick={handleCloseDeleteDialog}>
            Cancel
          </Button>
          <Button variant='contained' className={classes.removeButton} onClick={handleOk}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle disableTypography>
          <Typography variant='h5'>Edit Entry</Typography>
        </DialogTitle>

        <DialogContent>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant='inline'
              format='MM/dd/yyyy'
              margin='normal'
              id='date-picker-inline'
              label='Date'
              autoOk // autocloses picker
              value={date}
              onChange={setDate}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              className={classes.KeyboardDatePicker}
            />
          </MuiPickersUtilsProvider>

          <Typography gutterBottom style={{ margin: "20px 0px 5px 0px" }}>
            Progress: {`${sliderValue}%`}
          </Typography>
          <Slider
            defaultValue={sliderValue}
            step={5}
            marks={marks}
            min={5}
            max={100}
            onChange={handleSliderChange}
            style={{ marginBottom: "30px" }}
          />

          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            multiline
            rows={2}
            label='Notes'
            value={notes}
            onChange={e => {
              setNotes(e.target.value)
            }}
          />
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
          <Button variant='contained' className={classes.button} onClick={handleEditSubmit} color='primary'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
