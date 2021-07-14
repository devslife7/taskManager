import { Button, makeStyles } from '@material-ui/core'
import React from 'react'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles(() => ({
  createBtn: {
    margin: '7rem 0 0 10rem',
  },
  reportsContainer: {
    margin: '7rem 0 0 10rem',
    backgroundColor: '#f4f4f4',
  },
}))

export default function Reports() {
  const classes = useStyles()
  return (
    <div>
      <div className={classes.createBtn}>
        <Button
          variant='contained'
          color='primary'
          startIcon={<AddIcon style={{ fontSize: '1.4rem' }} />}
          style={{ fontSize: '1.2rem' }}
          // onClick={handleOpenDialog}
        >
          Create Report
        </Button>
      </div>

      <div className={classes.reportsContainer}>Reports here</div>
    </div>
  )
}
