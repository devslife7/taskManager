import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
// import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import { logOutCurrentUser } from "../actions/user"
import { clearCurrentProject } from "../actions/projects"
import { clearCurrentMilestone } from "../actions/milestones"
import { clearCurrentTask } from "../actions/tasks"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    // padding: "12px 0px",
    height: "100%",
    fontSize: "1.55rem",
    fontWeight: "400",
    color: "white",
  },
  links: {
    color: "white",
    textDecoration: "none",
    fontSize: "1.14rem",
    padding: "0px 20px",
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  gridHeight: {
    height: "100%",
  },
  onHover: {
    "&:hover": {
      // color: "rgb(255, 255, 255, 0.6)" // white with opacity of 0.6
      color: theme.palette.primary.dark,
      backgroundColor: "white",
    },
  },
  appBar: {
    backgroundColor: theme.palette.primary.dark,
  },
}))

function NavBar() {
  const dispatch = useDispatch()
  console.log("--------------------")
  console.log("renders NavBar")
  const classes = useStyles()
  const currentUser = useSelector(state => state.user.currentUser)
  const loggedIn = useSelector(state => state.user.loggedIn)

  const handleSignOut = () => {
    dispatch(logOutCurrentUser())
    dispatch(clearCurrentProject())
    dispatch(clearCurrentMilestone())
    dispatch(clearCurrentTask())
  }

  return (
    <>
      <AppBar position='static' className={classes.appBar}>
        <Grid container style={{ height: "5vh" }} alignItems='center'>
          <Grid item xs={4} container alignContent='center' className={classes.gridHeight}>
            {loggedIn && (
              <>
                <Link to='/dashboard' className={`${classes.links} ${classes.onHover}`}>
                  Dashboard
                </Link>
                {/* <Link to='/project/details' className={`${classes.links} ${classes.onHover}`}>
                  Project
                </Link>
                <Link to='/milestone/details' className={`${classes.links} ${classes.onHover}`}>
                  Milestone
                </Link>
                <Link to='/task/details' className={`${classes.links} ${classes.onHover}`}>
                  Task
                </Link> */}
              </>
            )}
          </Grid>
          <Grid item xs={4} container alignItems='center' justify='center'>
            <Typography variant='h1' className={classes.title}>
              Project Manager
            </Typography>
          </Grid>
          <Grid item xs={4} container alignItems='center' justify='flex-end' className={classes.gridHeight}>
            {loggedIn && (
              <>
                <Link className={`${classes.links} ${classes.onHover}`} to='/profile'>
                  {currentUser.first_name}
                </Link>
                <Link className={`${classes.links} ${classes.onHover}`} to='/login' onClick={handleSignOut}>
                  Sign out
                </Link>
              </>
            )}
          </Grid>
        </Grid>
      </AppBar>
    </>
  )
}

export default NavBar
