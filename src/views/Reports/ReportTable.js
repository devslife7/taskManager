import * as React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import format from 'date-fns/format'
import { fromUnixTime, getUnixTime } from 'date-fns'
import { Divider } from '@material-ui/core'

export default function ReportTable({ milestones }) {
  const getStatus = end_date => {
    const today = getUnixTime(new Date())
    return end_date < today ? 'Past Due' : 'On Track'
  }

  return (
    <TableContainer style={{ marginTop: '3rem' }}>
      <div style={{ fontSize: '1.5rem', textAlign: 'center', marginBottom: '1rem' }}>Milestones Table</div>
      <Divider />
      <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align='right'>Progress</TableCell>
            <TableCell align='right'>Owner</TableCell>
            <TableCell align='right'>Hours</TableCell>
            <TableCell align='right'>Start</TableCell>
            <TableCell align='right'>End</TableCell>
            <TableCell align='right'>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {milestones.map(row => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='right'>{row.progress}%</TableCell>
              <TableCell align='right'>Owner</TableCell>
              <TableCell align='right'>{row.hours}</TableCell>
              <TableCell align='right'>{format(fromUnixTime(row.start_date), 'PP')}</TableCell>
              <TableCell align='right'>{format(fromUnixTime(row.end_date), 'PP')}</TableCell>
              <TableCell align='right'>{getStatus(row.end_date)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
