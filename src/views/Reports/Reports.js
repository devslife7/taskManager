import { Button, Grid, makeStyles, Paper } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import AddIcon from '@material-ui/icons/Add'
import { useDispatch, useSelector } from 'react-redux'
import CreateReportDialog from './CreateReportDialog'
import { fetchProjects } from '../../actions/projects'
import ReportCard from './ReportCard'
import format from 'date-fns/format'
import { fromUnixTime, parseISO } from 'date-fns'

const useStyles = makeStyles(() => ({
  createBtn: {
    margin: '7rem 0 0 10rem',
  },
  reportsContainer: {
    margin: '4rem 0 0 10rem',
    // backgroundColor: '#f4f4f4',
  },
}))

export default function Reports() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const userReports = useSelector(state => state.user.currentUser.reports)
  const [openDialog, setOpenDialog] = useState(false)

  const handleOpenDialog = () => setOpenDialog(true)
  const handleCloseDialog = () => setOpenDialog(false)

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  const renderReports = () => {
    return userReports.map((rep, idx) => (
      <Grid item key={idx}>
        <ReportCard report={rep} />
      </Grid>
    ))
  }

  // console.log(format('2021-07-15T01:02:10.929Z', 'MM dd yyyy'))
  // console.log(new Date('2021-07-15T01:02:10.929Z'))
  // const d = Date.parse('2021-07-15T01:02:10.929Z')
  // console.log(format(fromUnixTime(d), 'PP'))
  // console.log(format(fromUnixTime(d), 'PP'))
  // console.log(parseISO('2014-02-11T11:30:30'))

  const t = new Date('2021-07-15T01:02:10.929Z')
  console.log(format(t, 'PP p'))

  return (
    <div>
      <div className={classes.createBtn}>
        <Button
          variant='contained'
          color='primary'
          startIcon={<AddIcon style={{ fontSize: '1.4rem' }} />}
          style={{ fontSize: '1.2rem' }}
          onClick={handleOpenDialog}
        >
          Create Report
        </Button>
      </div>

      {/* Dialog prompting to create a new Report */}
      <CreateReportDialog open={openDialog} onClose={handleCloseDialog} />

      <div className={classes.reportsContainer}>
        {userReports.length === 0 ? (
          <div>Click on the create report button above to create your first report.</div>
        ) : (
          <Grid container spacing={5}>
            {renderReports()}
          </Grid>
        )}
      </div>
    </div>
  )
}
