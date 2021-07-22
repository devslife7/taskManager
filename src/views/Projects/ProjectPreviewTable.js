import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { addDays, format } from 'date-fns'

const useStyles = makeStyles({
  // table: {
  //   minWidth: 650,
  // },
})

export default function ProjectPreviewTable({ data }) {
  const classes = useStyles()

  // Parses Excel date to regular date
  const parseDate = excelDate => {
    return format(addDays(new Date(1899, 11, 30), excelDate), 'PP')
  }

  return (
    <div>
      <Typography style={{ margin: '1rem 0' }}>Excel file format preview:</Typography>

      <TableContainer component={Paper}>
        <Table className={classes.table} size='small' aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align='left'>Description</TableCell>
              <TableCell align='right'>Start Date</TableCell>
              <TableCell align='right'>End Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell component='th' scope='row'>
                  {row['Name']}
                </TableCell>
                <TableCell align='left'>{row['Description']}</TableCell>
                <TableCell align='right'>{parseDate(row['Start Date'])}</TableCell>
                <TableCell align='right'>{parseDate(row['End Date'])}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
