import React from 'react'
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { addDays, format } from 'date-fns'

const useStyles = makeStyles({})

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
