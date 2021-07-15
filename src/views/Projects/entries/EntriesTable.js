import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@material-ui/core'
import { Paper, Slider, Table, TableBody, TableCell, TableHead, makeStyles } from '@material-ui/core'
import { TablePagination, TableRow, TableSortLabel, TextField, Typography } from '@material-ui/core'
import { fromUnixTime, format, getUnixTime } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { deleteEntryFetch, editEntryFetch } from '../../../actions/tasks'

const useStyle = makeStyles(theme => ({
  table: {
    marginTop: theme.spacing(2),
    '& thead th': {
      fontWeight: '600',
      color: theme.palette.primary.main,
      backgroundColor: '#f4f4f4',
    },
    '& tbody td': {
      fontWeight: '300',
    },
    '& tbody tr:hover': {
      backgroundColor: '#fffbf2',
      // cursor: "pointer",
    },
  },
  paper: {
    borderRadius: '2px',
    width: '60rem',
    margin: 'auto',
  },
  editIcon: {
    color: theme.palette.success.main,
  },
  button: {
    textTransform: 'none',
    fontSize: '1rem',
    marginLeft: '10vw',
  },
  KeyboardDatePicker: {
    width: '140px',
    marginTop: 0,
  },
  removeButton: {
    textTransform: 'none',
    fontSize: '1rem',
    color: 'white',
    backgroundColor: theme.palette.error.main,

    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
}))

export default function EntriesTable() {
  const dispatch = useDispatch()
  const classes = useStyle()
  const records = useSelector(state => state.tasks.currentTask.entries)
  const headCells = [
    { id: 'users', label: 'Owner' },
    { id: 'progress', label: 'Progress' },
    { id: 'date', label: 'Date' },
    { id: 'notes', label: 'Notes', disableSorting: true },
    { id: 'actions', label: 'Actions', disableSorting: true },
  ]

  const pages = [5, 10, 25]
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(pages[0])
  const [order, setOrder] = useState()
  const [orderBy, setOrderBy] = useState()

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [currentEntry, setCurrentEntry] = useState({})
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [sliderValue, setSliderValue] = useState(80)
  const [date, setDate] = useState()
  const [notes, setNotes] = useState('')

  const handleSliderChange = (e, newValue) => {
    setSliderValue(newValue)
  }

  const handleEditSubmit = () => {
    const requestBody = {
      entry: {
        date: getUnixTime(date),
        progress: sliderValue,
        notes: notes,
      },
    }
    dispatch(editEntryFetch(requestBody, currentEntry.id)) // sends the request body for fetch
    handleCloseEditDialog()
  }

  const handleOpenEditDialog = entry => {
    setSliderValue(entry.progress)
    setNotes(entry.notes)
    setDate(fromUnixTime(entry.date))
    setOpenEditDialog(true)
    setCurrentEntry(entry)
  }
  const handleCloseEditDialog = () => setOpenEditDialog(false)
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false)

  const handleOpenDeleteDialog = entry => {
    setOpenDeleteDialog(true)
    setCurrentEntry(entry)
  }
  const handleDeleteConfirm = () => {
    dispatch(deleteEntryFetch(currentEntry.id))
    handleCloseDeleteDialog()
  }

  const tableHead = () => {
    const handleSortRequest = cellId => {
      const isAsc = orderBy === cellId && order === 'asc'
      setOrder(isAsc ? 'desc' : 'asc')
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
                  direction={orderBy === headCell.id ? order : 'asc'}
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
    return order === 'desc'
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
  const marks = [
    { value: 5, label: '5%' },
    { value: 25, label: '25%' },
    { value: 50, label: '50%' },
    { value: 75, label: '75%' },
    { value: 100, label: '100%' },
  ]

  return (
    <>
      <Paper className={classes.paper}>
        <Table className={classes.table} size='small'>
          {tableHead()}
          <TableBody>
            {recordsAfterPagingAndSorting().map((item, idx) => (
              <TableRow key={idx} onClick={() => console.log('clicks table row')}>
                <TableCell>
                  {item.users && item.users.length > 0 ? item.users[0].first_name : 'Owner'}
                </TableCell>
                <TableCell>{`${item.progress}%`}</TableCell>
                <TableCell>{format(fromUnixTime(item.date), 'PP')}</TableCell>
                <TableCell>{item.notes}</TableCell>
                <TableCell>
                  <Tooltip title='Edit' arrow enterDelay={700}>
                    <IconButton onClick={() => handleOpenEditDialog(item)}>
                      <EditIcon fontSize='small' className={classes.editIcon} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Delete' arrow enterDelay={100}>
                    <IconButton onClick={() => handleOpenDeleteDialog(item)}>
                      <DeleteIcon fontSize='small' color='error' />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {tablePagination()}
      </Paper>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle disableTypography>
          <Typography variant='h5'>
            Deleting Entry: {!!currentEntry.date && format(fromUnixTime(currentEntry.date), 'PP')}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {'Are you sure you want to delete this Entry?\nThis action cannot be undone.'}
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
                'aria-label': 'change date',
              }}
              className={classes.KeyboardDatePicker}
            />
          </MuiPickersUtilsProvider>

          <Typography gutterBottom style={{ margin: '20px 0px 5px 0px' }}>
            Progress: {`${sliderValue}%`}
          </Typography>
          <Slider
            value={sliderValue}
            step={5}
            marks={marks}
            min={5}
            max={100}
            onChange={handleSliderChange}
            style={{ marginBottom: '30px' }}
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
