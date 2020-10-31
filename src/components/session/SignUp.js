import { Box, Button, Grid, makeStyles, Paper, TextField, Typography } from "@material-ui/core"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { setCurrentUser } from "../../actions/user"
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

function SignUp({ history }) {
  const dispatch = useDispatch()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const classes = useStyles()

  const clearForm = () => {
    setFirstName("")
    setLastName("")
    setUsername("")
    setPassword("")
  }

  const handleSignup = e => {
    e.preventDefault()
    const signUpURL = process.env.REACT_APP_SERVER_URL + "/users"

    let postRequest = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
          history.push("/dashboard")
          clearForm()
        }
        // }
      )
  }

  return (
    <>
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
    </>
  )
}

export default SignUp
