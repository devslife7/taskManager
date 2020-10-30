import { Box, Button, Grid, Paper, TextField, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useDispatch } from "react-redux"
import { setCurrentUser, logOutCurrentUser } from "../../actions/user"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: "10vh",
    padding: "4vh",
    maxWidth: "40vh",
    margin: "auto",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  links: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    fontFamily: "Arial",
  },
}))

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {"Copyright © "}
      {" Task Manager "} {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

function Login({ history }) {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    dispatch(logOutCurrentUser())
  }, [dispatch])

  const handleLogin = e => {
    e.preventDefault()
    const logInURL = process.env.REACT_APP_SERVER_URL + "login"
    
    let requestBody = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    }

    if (username === "" || password === ""){
      alert("Username or Password cannot be blank")
    } else {
      fetch(logInURL, requestBody)
        .then(resp => resp.json())
        .then(data => {
          localStorage.token = data.token
          localStorage.userId = data.user.id
          console.log("this is the data.user from fetch: ", data.user)
          dispatch(setCurrentUser(data.user))
          history.push("/dashboard")
        })
        .catch( error => {
          console.error('Error is this :', error)
        })
    }

    setUsername("")
    setPassword("")
  }

  return (
    <>
      <Paper className={classes.paper}>
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
        <Copyright />
      </Box>
    </>
  )
}

export default Login
