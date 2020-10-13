import React, { useState } from "react"
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@material-ui/core"
import { fromUnixTime, format } from "date-fns"

import { useSelector } from "react-redux"

const useStyle = makeStyles(theme => ({
  table: {
    marginTop: theme.spacing(3),
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
      cursor: "pointer",
    },
  },
  paper: {
    borderRadius: "2px",
    width: "70rem",
    margin: "auto",
  },
}))

export default function useTable() {
  const classes = useStyle()
  const records = useSelector(state => state.tasks.currentTask.entries)
  const headCells = [
    { id: "owner", label: "Owner" },
    { id: "progress", label: "Progress(%)" },
    { id: "date", label: "Date" },
    { id: "notes", label: "Notes", disableSorting: true },
  ]

  const pages = [5, 10, 25]
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(pages[0])
  const [order, setOrder] = useState()
  const [orderBy, setOrderBy] = useState()

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
    console.log("stabilizedThis: ", stabilizedThis)
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
    return tableSort(records, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      (page + 1) * rowsPerPage
    )
  }

  return (
    <>
      <Paper className={classes.paper}>
        <Table className={classes.table}>
          {tableHead()}
          <TableBody>
            {recordsAfterPagingAndSorting().map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{"Owner"}</TableCell>
                <TableCell>{`${item.progress}%`}</TableCell>
                <TableCell>{format(fromUnixTime(item.date), "PP")}</TableCell>
                <TableCell>{item.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {tablePagination()}
      </Paper>
    </>
  )
}
