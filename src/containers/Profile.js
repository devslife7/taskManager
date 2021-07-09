import { makeStyles, TextField } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
  container: {
    margin: '100px auto',
    // backgroundColor: 'red',
    textAlign: 'center',
    width: '400px',
  },
  title: {
    fontSize: '3.5rem',
  },
  textField: {
    marginTop: '50px',
  },
}))

export default function Profile() {
  const classes = useStyles()
  const currentUser = useSelector(state => state.user.currentUser)
  return (
    <div className={classes.container}>
      <div className={classes.title}>Personal Info</div>

      <TextField
        id='outlined-first-name'
        label='First Name'
        variant='outlined'
        className={classes.textField}
        value={`${currentUser.first_name}`}
        fullWidth
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        id='outlined-last-name'
        label='Last Name'
        fullWidth
        className={classes.textField}
        value={`${currentUser.last_name}`}
        InputProps={{
          readOnly: true,
        }}
        variant='outlined'
      />
      <TextField
        id='outlined-username'
        label='Username'
        fullWidth
        className={classes.textField}
        value={`${currentUser.username}`}
        InputProps={{
          readOnly: true,
        }}
        variant='outlined'
      />
      <TextField
        id='outlined-role'
        label='Role'
        fullWidth
        className={classes.textField}
        value={`${currentUser.role}`}
        InputProps={{
          readOnly: true,
        }}
        variant='outlined'
      />
    </div>
  )
}
