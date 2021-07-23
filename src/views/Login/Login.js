import { Box, Button, Grid, Paper, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { setCurrentUser, logOutCurrentUser } from '../../redux/actions/user'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BackgroundImg from '../../img/BackgroundImg.jpg'
import ProTaskLogo from '../../img/ProTaskLogo.png'

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
  root: {
    padding: '4vh',
    maxWidth: '40vh',
    margin: '0px auto',
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
  demoLogin: {
    margin: '30px 0 15px 0',
    borderRadius: '5px',
    color: theme.palette.primary.main,
    fontSize: '18px',
  },
}))

export default function Login({ history }) {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(logOutCurrentUser())
  }, [dispatch])

  const handleLogin = e => {
    e.preventDefault()
    const logInURL = process.env.REACT_APP_SERVER_URL + '/login'

    let requestBody = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    }

    if (username === '' || password === '') {
      alert('Username or Password cannot be blank')
    } else {
      fetch(logInURL, requestBody)
        .then(resp => resp.json())
        .then(data => {
          localStorage.token = data.token
          localStorage.userId = data.user.id
          dispatch(setCurrentUser(data.user))
          history.push('/projects')
        })
        .catch(error => {
          console.error('Error :', error.message)
        })
    }

    setUsername('')
    setPassword('')
  }

  return (
    <div className={classes.container}>
      <div className={classes.backgroundFilter}>
        <div className={classes.titleContainer}>
          <img src={ProTaskLogo} alt='logo' className={classes.logoStyle} />
          ProTasker
        </div>
        <Paper className={classes.root}>
          <Typography component='h1' variant='h5' color='primary'>
            Login
          </Typography>

          <div className={classes.demoLogin}>Demo Login: demo/demo</div>

          <form className={classes.form} noValidate onSubmit={handleLogin}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='Username'
              autoFocus
              value={username}
              onChange={e => {
                setUsername(e.target.value)
              }}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='Password'
              type='password'
              value={password}
              onChange={e => {
                setPassword(e.target.value)
              }}
            />

            <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
              Log In
            </Button>

            <Grid container justify='flex-end'>
              <Grid item>
                <Link to='/signup' className={classes.links}>
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <Box mt={8}>
          <Typography variant='body2' align='center' style={{ color: '#FFF' }}>
            Copyright © ProTask {new Date().getFullYear()}.
          </Typography>
        </Box>
      </div>
    </div>
  )
}
