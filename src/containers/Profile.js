import { makeStyles, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
  container: {
    margin: '100px auto',
    textAlign: 'center',
    width: '400px',
  },
  title: {
    fontSize: '3.5rem',
    marginBottom: '2rem',
    fontWeight: '300',
  },
  textField: {
    marginTop: '50px',
  },
}))

export default function Profile() {
  console.log('renders Profile page')
  const classes = useStyles()
  // const currentUser = useSelector(state => state.user.currentUser)
  // const [firstName, setFirstName] = useState(currentUser.first_name)
  // const [lastName, setLastName] = useState(currentUser.last_name)
  // const [email, setEmail] = useState('Set Email')

  return (
    <div className={classes.container}>
      {/* {console.log('value of firstName: ', firstName)} */}
      {/* {console.log('value of lastName: ', currentUser.last_name)} */}
      <div className={classes.title}>Personal Info</div>

      <TextField
        id='outlined-first-name'
        label='First Name'
        className={classes.textField}
        // value={`${currentUser.first_name}`}
        // value={firstName}
        fullWidth
        // InputProps={{
        //   readOnly: true,
        // }}
        variant='outlined'
      />
      <TextField
        id='outlined-last-name'
        label='Last Name'
        fullWidth
        className={classes.textField}
        // value={`${currentUser.last_name}`}
        // InputProps={{
        //   readOnly: true,
        // }}
        variant='outlined'
      />
      <TextField
        id='outlined-username'
        label='Username'
        fullWidth
        className={classes.textField}
        // value={`${currentUser.username}`}
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
        // value={`${currentUser.role}`}
        InputProps={{
          readOnly: true,
        }}
        variant='outlined'
      />

      <TextField
        id='outlined-email'
        label='Email'
        className={classes.textField}
        value={`Email`}
        fullWidth
        // InputProps={{
        //   readOnly: true,
        // }}
        variant='outlined'
      />
    </div>
  )
}
