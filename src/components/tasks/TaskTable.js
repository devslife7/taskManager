import React, { useState } from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@material-ui/core"
import { Paper, Table, TableBody, TableCell, TableHead, makeStyles } from "@material-ui/core"
import { TablePagination, TableRow, TableSortLabel, TextField, Typography } from "@material-ui/core"
import { fromUnixTime, format } from "date-fns"
import { useDispatch, useSelector } from "react-redux"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import { fetchCurrentTask } from "../../actions/tasks"
import isPast from "date-fns/isPast"

const useStyle = makeStyles(theme => ({
  table: {
    marginTop: theme.spacing(2),
    "& thead th": {
      fontWeight: "600",
      color: theme.palette.primary.main,
      backgroundColor: "#f4f4f4",
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      // backgroundColor: "#fffbf2",
      // cursor: "pointer",
    },
  },
  paper: {
    borderRadius: "2px",
    width: "80rem",
    margin: "auto",
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
  nameHover: {
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
}))

export default function TaskTable() {
  const dispatch = useDispatch()
  const classes = useStyle()
  const records = useSelector(state => state.milestones.currentMilestone.tasks)
  const headCells = [
    { id: "name", label: "Name" },
    { id: "progress", label: "Progress(%)" },
    { id: "owner", label: "Owner" },
    { id: "hours", label: "Hours" },
    { id: "start_date", label: "Start" },
    { id: "end_date", label: "End" },
    { id: "status", label: "Status" },
    { id: "notes", label: "Notes", disableSorting: true },
    { id: "actions", label: "Actions", disableSorting: true },
  ]

  const pages = [5, 10, 25]
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(pages[0])
  const [order, setOrder] = useState()
  const [orderBy, setOrderBy] = useState()

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

  const tableHead = () => {
    const handleSortRequest = cellId => {
      const isAsc = orderBy === cellId && order === "asc"
      setOrder(isAsc ? "desc" : "asc")
      setOrderBy(cellId)
    }
    return (
      <TableHead>
        <TableRow>
          {headCells.map(headCell => (
            <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false}>
              {headCell.disableSorting ? (
                headCell.label
              ) : (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  onClick={() => handleSortRequest(headCell.id)}
                  direction={orderBy === headCell.id ? order : "asc"}
                >
                  {headCell.label}
                </TableSortLabel>
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    )
  }

  const handleChangePage = (e, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const tablePagination = () => {
    return (
      <TablePagination
        component='div'
        page={page}
        rowsPerPageOptions={pages}
        rowsPerPage={rowsPerPage}
        count={records.length}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    )
  }

  function tableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0])
      if (order !== 0) return order
      return a[1] - b[1]
    })
    return stabilizedThis.map(el => el[0])
  }
  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy)
  }
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  }

  const recordsAfterPagingAndSorting = () => {
    if (order && orderBy) {
      return tableSort(records, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        (page + 1) * rowsPerPage
      )
    } else {
      return tableSort(records, getComparator(order, orderBy))
        .sort((a, b) => b.id - a.id) // sorts records by date
        .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    }
  }

  const handleStatus = date => {
    if (isPast(date)) {
      return (
        <div style={{ backgroundColor: "red", textAlign: "center", borderRadius: "5px", color: "white" }}>
          Past Due
        </div>
      )
    } else {
      return (
        <div style={{ backgroundColor: "green", textAlign: "center", borderRadius: "5px", color: "white" }}>
          On Track
        </div>
      )
    }
  }

  return (
    <>
      <Paper className={classes.paper}>
        <Table className={classes.table} size='small'>
          {tableHead()}
          <TableBody>
            {recordsAfterPagingAndSorting().map((item, idx) => (
              <TableRow key={idx}>
                <TableCell className={classes.nameHover} onClick={() => handleLink(item.id)}>
                  {item.name}
                </TableCell>
                <TableCell>{`${item.progress}%`}</TableCell>
                <TableCell>{"Owner"}</TableCell>
                <TableCell>{item.hours}</TableCell>
                <TableCell>{format(fromUnixTime(item.start_date), "PP")}</TableCell>
                <TableCell>{format(fromUnixTime(item.end_date), "PP")}</TableCell>
                <TableCell>{handleStatus(fromUnixTime(item.end_date), "PP")}</TableCell>
                <TableCell>{item.notes}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenEditDialog(item)}>
                    <EditIcon fontSize='small' className={classes.editIcon} />
                  </IconButton>
                  <IconButton onClick={() => handleOpenDeleteDialog(item)}>
                    <DeleteIcon fontSize='small' color='error' />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {tablePagination()}
      </Paper>

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
