import { makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(() => ({
  container: {
    margin: '100px auto',
    fontSize: '2rem',
    backgroundColor: 'yellow',
  },
}))

export default function Inbox() {
  const classes = useStyles()
  return (
    <>
      <div className={classes.container}>
        <div>Inbox Page coming soon...</div>
        <div>format Exel sheets</div>
      </div>
    </>
  )
}
