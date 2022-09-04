import { Box, Button, Grid, Paper, Snackbar, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { setCurrentUser, logOutCurrentUser, wakeupHeroku } from '../../redux/actions/user'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BackgroundImg from '../../img/BackgroundImg.jpg'
import ProTaskLogo from '../../img/ProTaskLogo.png'
import MuiAlert from '@material-ui/lab/Alert'
import CircularProgress from '@material-ui/core/CircularProgress'
import axios from 'axios'

const logInURL = process.env.REACT_APP_SERVER_URL + '/login'

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
    padding: '3vh',
    maxWidth: '25vh',
    margin: '0px auto',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    marginBottom: '1.5rem',
  },
  links: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontFamily: 'Arial',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
  guestLogInLink: {
    cursor: 'pointer',
    color: theme.palette.primary.main,

    '&:hover': {
      textDecoration: 'underline',
    },
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

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

export default function Login({ history }) {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [openSnack, setOpenSnack] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const openSnackBar = () => setOpenSnack(true)
  const handleSnackClose = () => setOpenSnack(false)
  const vertical = 'top'
  const horizontal = 'center'

  useEffect(() => {
    dispatch(logOutCurrentUser())
    dispatch(wakeupHeroku())
  }, [dispatch])

  const handleLogin = async e => {
    e.preventDefault()
    setIsLoading(true)

    if (username === '' || password === '') {
      alert('Username or Password cannot be blank')
      setIsLoading(false)
      return
    }

    let requestBody = {
      user: {
        username: username,
        password: password,
      },
    }

    try {
      const resp = await axios.post(logInURL, requestBody)
      let data = resp.data
      console.log('data: ', data)
      localStorage.token = data.token
      dispatch(setCurrentUser(data.user))
    } catch (err) {
      setErrorMessage(err.response.data.error)
      openSnackBar()
      resetForm()
      return
    }

    resetForm()
    history.push('/projects')
  }

  const resetForm = () => {
    setIsLoading(false)
    setUsername('')
    console.log('Username after set Username::: ', username)
    setPassword('')
  }

  const handleGuestLogIn = e => {
    console.log('Enters handleGuestLogIn method')
    setUsername('demo')
    setPassword('demo')
    // console.log('Username after setUsername(): ', username)
    // console.log('Username after setPassword(): ', password)
    handleLogin(e)
  }

  return (
    <div className={classes.container}>
      {console.log('Renders Login page.')}
      <div className={classes.backgroundFilter}>
        <div className={classes.titleContainer}>
          <img src={ProTaskLogo} alt='logo' className={classes.logoStyle} />
          ProTasker
        </div>
        <Paper className={classes.root}>
          <Typography component='h1' variant='h5' color='primary'>
            Login
          </Typography>

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
              {isLoading ? (
                <CircularProgress style={{ width: '30px', height: '30px', color: 'inherit' }} />
              ) : (
                'Log In'
              )}
            </Button>

            <Grid container direction='column' justifyContent='space-between' style={{ height: '4rem' }}>
              <Grid item>
                <Link to='/signup' className={classes.links}>
                  Don't have an account? Sign Up
                </Link>
              </Grid>
              <Grid item>
                <button type='submit' className={classes.guestLogInLink} onClick={e => handleGuestLogIn(e)}>
                  Log In as Guest
                </button>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <Box mt={8}>
          <Typography variant='body2' align='center' style={{ color: '#FFF' }}>
            Copyright © ProTask {new Date().getFullYear()}.
          </Typography>
        </Box>

        <Snackbar
          open={openSnack}
          autoHideDuration={3000}
          onClose={handleSnackClose}
          anchorOrigin={{ vertical, horizontal }}
        >
          <Alert onClose={handleSnackClose} severity='error'>
            {errorMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  )
}
