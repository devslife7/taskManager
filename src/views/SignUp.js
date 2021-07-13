import { Box, Button, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '../actions/user'
import { Link } from 'react-router-dom'
import BackgroundImg from '../img/BackgroundImg.jpg'
import ProTaskLogo from '../img/ProTaskLogo.png'

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    height: '100vh',
    padding: 0,
    backgroundImage: `url(${BackgroundImg})`,
    backgroundSize: 'cover',
  },
  backgroundFilter: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(53, 53, 53, 0.75)',
    position: 'fixed',
  },
  paper: {
    padding: '4vh',
    maxWidth: '40vh',
    margin: '0 auto',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  links: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontFamily: 'Arial',
  },
  titleContainer: {
    margin: '4rem 0',
    color: '#fff',
    fontSize: '2.5rem',
    display: 'flex',
    justifyContent: 'center',
  },
  logoStyle: {
    width: '2.7rem',
    marginRight: '10px',
  },
}))

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center' style={{ color: '#fff' }}>
      {'Copyright © '}
      {' ProTask '} {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default function SignUp({ history }) {
  const dispatch = useDispatch()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const classes = useStyles()

  const clearForm = () => {
    setFirstName('')
    setLastName('')
    setUsername('')
    setPassword('')
  }

  const handleSignup = e => {
    e.preventDefault()
    const signUpURL = process.env.REACT_APP_SERVER_URL + '/users'

    let postRequest = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          first_name: firstName,
          last_name: lastName,
          username: username,
          password: password,
        },
      }),
    }

    fetch(signUpURL, postRequest)
      .then(resp => resp.json())
      .then(
        data => {
          console.log(data)
          // if (data.error) {
          //   openSnackBar(data.error)
          // } else {
          localStorage.token = data.token
          localStorage.userId = data.user.id
          dispatch(setCurrentUser(data.user))
          history.push('/projects')
          clearForm()
        }
        // }
      )
  }

  return (
    <div className={classes.container}>
      <div className={classes.backgroundFilter}>
        <div className={classes.titleContainer}>
          <img src={ProTaskLogo} alt='logo' className={classes.logoStyle} />
          ProTasker
        </div>
        <Paper className={classes.paper}>
          <Typography component='h1' variant='h5' color='primary'>
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSignup}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='First Name'
              autoFocus
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='Last Name'
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='Username'
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='Password'
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
              Sign Up
            </Button>
            <Grid container justify='flex-end'>
              <Grid item>
                <Link to='/login' className={classes.links}>
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <Box mt={5}>
          <Copyright />
        </Box>
      </div>
    </div>
  )
}
