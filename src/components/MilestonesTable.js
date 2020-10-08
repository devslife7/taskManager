import React, { useState } from "react"
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
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos"
import { fetchCurrentMilestone } from "../actions/milestones"
import { fromUnixTime, format } from "date-fns"
import DateFnsUtils from "@date-io/date-fns"
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"

const useStyles = makeStyles(theme => ({
  table: {
    width: "50vw",
    marginTop: "1vh",
    marginLeft: "10vw",
  },
  editIcon: {
    color: theme.palette.success.main,
  },
  forwardIcon: {
    color: theme.palette.primary.main,
  },
  button: {
    textTransform: "none",
    fontSize: "1rem",
    marginLeft: "10vw",
    marginTop: "2vh",
  },
  KeyboardDatePicker: {
    width: "140px",
  },
  removeButton: {
    textTransform: "none",
    fontSize: "1rem",
    color: "white",
    marginLeft: "10vw",
    marginTop: "2vh",
    backgroundColor: theme.palette.error.main,

    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
}))

export default function MilestonesTable() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const currentProject = useSelector(state => state.projects.currentProject)

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [currentMilestone, setCurrentMilestone] = useState({ name: "" })
  const [name, setName] = useState("")
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()

  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false)
  const handleCloseEditDialog = () => setOpenEditDialog(false)
  const handleSetStartDate = date => setStartDate(date)
  const handleSetEndDate = date => setEndDate(date)

  const handleOpenDeleteDialog = milestone => {
    setOpenDeleteDialog(true)
    setCurrentMilestone(milestone)
  }
  const handleOpenEditDialog = milestone => {
    setName(milestone.name)
    setStartDate(fromUnixTime(milestone.start_date))
    setEndDate(fromUnixTime(milestone.end_date))
    setOpenEditDialog(true)
  }
  const handleDeleteConfirm = () => {
    console.log("Confirms delete milestone")
    // dispatch(deleteEntryFetch(currentMilestone.id))
    handleCloseDeleteDialog()
  }
  const handleEditDialogSubmit = () => {
    console.log("submits edit dialog")
    handleCloseEditDialog()
  }

  // const handleDelete = entryId => {
  //   const entriesURL = "http://localhost:3000/entries/"

  //   fetch(entriesURL + entryId, { method: "DELETE" })
  //     .then(resp => resp.json())
  //     .then(data => console.log(data))
  // }

  const handleSetCurrentMilestone = milestoneId => {
    localStorage.setItem("currentMilestoneId", `${milestoneId}`)
    dispatch(fetchCurrentMilestone())
  }

  const renderRows = () => {
    return currentProject.milestones.map((milestone, idx) => (
      <TableRow key={idx}>
        <TableCell component='th' scope='row'>
          {milestone.name}{" "}
        </TableCell>
        <TableCell align='right'>{`${milestone.progress}%`}</TableCell>
        <TableCell align='right'>{milestone.hours}</TableCell>
        <TableCell align='right'>{format(fromUnixTime(milestone.start_date), "PP")} </TableCell>
        <TableCell align='right'>{format(fromUnixTime(milestone.end_date), "PP")} </TableCell>
        <TableCell align='right'>
          <IconButton onClick={() => handleOpenEditDialog(milestone)}>
            <EditIcon fontSize='small' className={classes.editIcon} />
          </IconButton>
          <IconButton onClick={() => handleOpenDeleteDialog(milestone)}>
            <DeleteIcon fontSize='small' color='error' />
          </IconButton>
          <IconButton onClick={() => handleSetCurrentMilestone(milestone.id)}>
            <ArrowForwardIosIcon fontSize='small' className={classes.forwardIcon} />
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
              <TableCell>Milestones</TableCell>
              {/* <TableCell style={{ width: "100px" }}>Name </TableCell> */}
              <TableCell align='right'>Progress%</TableCell>
              <TableCell align='right'>Hours</TableCell>
              <TableCell align='right'>Start</TableCell>
              <TableCell align='right'>End</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderRows()}</TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle disableTypography>
          <Typography variant='h5'>Deleting Milestone: {`${currentMilestone.name}`}</Typography>
        </DialogTitle>
        <DialogContent>
          {"Are you sure you want to delete this Milestone?\nThis action cannot be undone."}
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
        <Typography variant='h5' style={{ marginTop: "20px", marginLeft: "30px" }}>
          {"Edit Milestone"}
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
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
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
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
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
