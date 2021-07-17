import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@material-ui/core'
import { Paper, Table, TableBody, TableCell, TableHead, makeStyles } from '@material-ui/core'
import { TablePagination, TableRow, TableSortLabel, Typography } from '@material-ui/core'
import { fromUnixTime, format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { deleteTaskFetch, fetchCurrentTask } from '../../../redux/actions/tasks'
import isPast from 'date-fns/isPast'
import TasksDialog from './TasksDialog'

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
      // backgroundColor: "#fffbf2",
      // cursor: "pointer",
    },
  },
  paper: {
    borderRadius: '2px',
    width: '80rem',
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
  removeButton: {
    textTransform: 'none',
    fontSize: '1rem',
    color: 'white',
    backgroundColor: theme.palette.error.main,

    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
  nameHover: {
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
}))

export default function TaskTable() {
  const dispatch = useDispatch()
  const classes = useStyle()
  const records = useSelector(state => state.milestones.currentMilestone.tasks)
  const pages = [5, 10, 25]
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(pages[0])
  const [order, setOrder] = useState()
  const [orderBy, setOrderBy] = useState()

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [currentTask, setCurrentTask] = useState({ name: '' })

  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false)
  const handleCloseEditDialog = () => setOpenEditDialog(false)

  const handleOpenDeleteDialog = task => {
    setOpenDeleteDialog(true)
    setCurrentTask(task)
  }
  const handleOpenEditDialog = task => {
    setCurrentTask(task)
    setOpenEditDialog(true)
  }

  const handleDeleteConfirm = () => {
    dispatch(deleteTaskFetch(currentTask.id))
    handleCloseDeleteDialog()
  }

  const handleLink = taskId => {
    localStorage.setItem('currentTaskId', `${taskId}`)
    dispatch(fetchCurrentTask())
  }

  const headCells = [
    { id: 'name', label: 'Name' },
    { id: 'progress', label: 'Progress' },
    { id: 'owner', label: 'Owner' },
    { id: 'hours', label: 'Hours' },
    { id: 'start_date', label: 'Start' },
    { id: 'end_date', label: 'End' },
    { id: 'status', label: 'Status' },
    { id: 'notes', label: 'Notes', disableSorting: true },
    { id: 'actions', label: 'Actions', disableSorting: true },
  ]

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

  const handleStatus = date => {
    if (isPast(date)) {
      return (
        <div style={{ backgroundColor: 'red', textAlign: 'center', borderRadius: '5px', color: 'white' }}>
          Past Due
        </div>
      )
    } else {
      return (
        <div style={{ backgroundColor: 'green', textAlign: 'center', borderRadius: '5px', color: 'white' }}>
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
                <TableCell>{'Owner'}</TableCell>
                <TableCell>{item.hours}</TableCell>
                <TableCell>{format(fromUnixTime(item.start_date), 'PP')}</TableCell>
                <TableCell>{format(fromUnixTime(item.end_date), 'PP')}</TableCell>
                <TableCell>{handleStatus(fromUnixTime(item.end_date), 'PP')}</TableCell>
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
          {'Are you sure you want to delete this Task?\nThis action cannot be undone.'}
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

      <TasksDialog open={openEditDialog} onClose={handleCloseEditDialog} task={currentTask} />
    </>
  )
}
