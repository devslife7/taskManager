import { Button, makeStyles, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentUser, updateCurrentUser } from '../actions/user'

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
  submitBtn: {
    fontSize: '1.2rem',
    marginTop: '4rem',
  },
}))

export default function Profile() {
  console.log('renders Profile page')
  const dispatch = useDispatch()
  const classes = useStyles()
  const currentUser = useSelector(state => state.user.currentUser)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  if (firstName == '' && currentUser.first_name !== undefined) {
    setFirstName(currentUser.first_name)
    setLastName(currentUser.last_name)
    setEmail(currentUser.email)
  }

  const onValueChange = e => {
    const target = e.target

    switch (target.id) {
      case 'first-name':
        setFirstName(target.value)
        break
      case 'last-name':
        setLastName(target.value)
        break
      default:
        setEmail(target.value)
    }
  }

  const isInfoEdited = () => {
    return (
      firstName !== currentUser.first_name ||
      lastName !== currentUser.last_name ||
      email !== currentUser.email
    )
  }

  const handleProfileEdit = () => {
    // const userUrl = 'http://localhost:3000/users/'

    // const patchRequest = {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     first_name: firstName,
    //     last_name: lastName,
    //     email: email,
    //   }),
    // }

    const requestBody = {
      first_name: firstName,
      last_name: lastName,
      email: email,
    }

    dispatch(updateCurrentUser(requestBody))

    // fetch(userUrl + currentUser.id, patchRequest)
    //   .then(resp => resp.json())
    //   .then(data => {
    //     dispatch(setCurrentUser(data))
    //   })

    // dispatch(saveProfileChanges(requestBody))
  }

  return (
    <div className={classes.container}>
      <div className={classes.title}>Personal Info</div>

      <TextField
        id='first-name'
        label='First Name'
        className={classes.textField}
        value={firstName}
        fullWidth
        variant='outlined'
        onChange={onValueChange}
      />
      <TextField
        id='last-name'
        label='Last Name'
        fullWidth
        className={classes.textField}
        value={lastName}
        variant='outlined'
        onChange={onValueChange}
      />
      <TextField
        id='username'
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
        id='role'
        label='Role'
        fullWidth
        className={classes.textField}
        value={`${currentUser.role}`}
        InputProps={{
          readOnly: true,
        }}
        variant='outlined'
      />

      <TextField
        id='email'
        label='Email'
        className={classes.textField}
        value={email}
        fullWidth
        variant='outlined'
        onChange={onValueChange}
      />

      {isInfoEdited() ? (
        <Button className={classes.submitBtn} variant='contained' color='primary' onClick={handleProfileEdit}>
          Save Changes
        </Button>
      ) : (
        <Button className={classes.submitBtn} variant='contained' color='primary' disabled>
          Save Changes
        </Button>
      )}
    </div>
  )
}
