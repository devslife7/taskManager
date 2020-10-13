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
import { Paper, Slider, Table, TableBody, TableCell, TableHead, makeStyles } from "@material-ui/core"
import { TablePagination, TableRow, TableSortLabel, TextField, Typography } from "@material-ui/core"
import { fromUnixTime, format, getUnixTime } from "date-fns"
import { useDispatch, useSelector } from "react-redux"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos"
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import { deleteEntryFetch, editEntryFetch, fetchCurrentTask } from "../actions/tasks"
import { fetchCurrentMilestone } from "../actions/milestones"

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
      backgroundColor: "#fffbf2",
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
  // DialogContent: {
  //   height: "160px",
  //   width: "350px",
  // },
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

export default function useTable() {
  const dispatch = useDispatch()
  const classes = useStyle()
  const records = useSelector(state => state.projects.currentProject.milestones)
  const headCells = [
    { id: "name", label: "Name" },
    { id: "progress", label: "Progress(%)" },
    { id: "owner", label: "Owner" },
    { id: "hours", label: "Hours" },
    { id: "start", label: "Start" },
    { id: "end", label: "End" },
    { id: "actions", label: "Actions", disableSorting: true },
  ]

  const pages = [5, 10, 25]
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(pages[0])
  const [order, setOrder] = useState()
  const [orderBy, setOrderBy] = useState()

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

  const handleSetCurrentMilestone = milestoneId => {
    localStorage.setItem("currentMilestoneId", `${milestoneId}`)
    dispatch(fetchCurrentMilestone())
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
        .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
        .sort((a, b) => b.id - a.id) // sorts records by date
    }
  }
  const marks = [
    { value: 5, label: "5%" },
    { value: 25, label: "25%" },
    { value: 50, label: "50%" },
    { value: 75, label: "75%" },
    { value: 100, label: "100%" },
  ]

  return (
    <>
      <Paper className={classes.paper}>
        <Table className={classes.table} size='small'>
          {tableHead()}
          <TableBody>
            {recordsAfterPagingAndSorting().map((item, idx) => (
              <TableRow key={idx} onClick={() => console.log("clicks table row")}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{`${item.progress}%`}</TableCell>
                <TableCell>{"Owner"}</TableCell>
                <TableCell>{item.hours}</TableCell>
                <TableCell>{format(fromUnixTime(item.start_date), "PP")}</TableCell>
                <TableCell>{format(fromUnixTime(item.end_date), "PP")}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenEditDialog(item)}>
                    <EditIcon fontSize='small' className={classes.editIcon} />
                  </IconButton>
                  <IconButton onClick={() => handleOpenDeleteDialog(item)}>
                    <DeleteIcon fontSize='small' color='error' />
                  </IconButton>
                  <IconButton onClick={() => handleSetCurrentMilestone(item.id)}>
                    <ArrowForwardIosIcon fontSize='small' color='primary' />
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
            style={{ marginBottom: "20px" }}
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

        <DialogActions style={{ marginTop: "10px" }}>
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
