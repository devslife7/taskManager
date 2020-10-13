import React from "react"
import { makeStyles, Table, TableCell, TableHead, TableRow } from "@material-ui/core"

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
}))

export default function useTable(records, headCells) {
  const classes = useStyle()
  const TblContainer = props => <Table className={classes.table}> {props.children} </Table>

  const TblHead = props => {
    return (
      <TableHead>
        <TableRow>
          {headCells.map(headCell => (
            <TableCell key={headCell.id}>{headCell.label}</TableCell>
          ))}
        </TableRow>
      </TableHead>
    )
  }

  return { TblContainer, TblHead }
}
