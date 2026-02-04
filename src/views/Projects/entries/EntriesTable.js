import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip } from '@mui/material'
import { Paper, Table, TableBody, TableCell, TableHead, IconButton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { TablePagination, TableRow, TableSortLabel, Typography } from '@mui/material'
import { fromUnixTime, format } from 'date-fns'
import { useDispatch } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { deleteEntryFetch } from '../../../redux/actions/tasks'
import EntriesDialog from './EntriesDialog'

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

export default function EntriesTable({ records }) {
  const dispatch = useDispatch()
  const classes = useStyle()
  const headCells = [
    { id: 'users', label: 'Owner(s)' },
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

  const [currentEntry, setCurrentEntry] = useState({})
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)

  const handleOpenEditDialog = entry => {
    setCurrentEntry(entry)
    setOpenEditDialog(true)
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

  return (
    <>
      <Paper className={classes.paper}>
        <Table className={classes.table} size='small'>
          {tableHead()}
          <TableBody>
            {recordsAfterPagingAndSorting().map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  {/* {item.users && item.users.length > 0 ? item.users[0].first_name : 'Owner'} */}
                  {item.users.length > 0 ? item.users[0].first_name : 'Owner'}
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
        {records.length === 0 ? (
          <Typography align='center' variant='subtitle1' color='textSecondary' style={{ padding: '2rem 0' }}>
            No entries created...
          </Typography>
        ) : (
          tablePagination()
        )}
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

      <EntriesDialog open={openEditDialog} onClose={handleCloseEditDialog} entry={currentEntry} />
    </>
  )
}
