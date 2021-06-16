import { makeStyles } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'

const useStyles = makeStyles({
  projects: {
    backgroundColor: '#fafafa',
    width: '15vw',
    height: '95vh',
  },
  loading: {
    margin: '8vh 0 0 18vw',
  },
})

function DashBoard() {
  // const classes = useStyles()
  // const dispatch = useDispatch()

  return <div style={{ margin: '100px auto', fontSize: '1.2rem' }}>Dashboard coming soon</div>
}

export default DashBoard
