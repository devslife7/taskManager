import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Paper from "@material-ui/core/Paper"
import Popover from "@material-ui/core/Popover"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import Avatar from "@material-ui/core/Avatar"
import Divider from "@material-ui/core/Divider"
import Button from "@material-ui/core/Button"
import Badge from "@material-ui/core/Badge"
import Grid from "@material-ui/core/Grid"
import { logOutCurrentUser } from "../actions/user"
import SportsSoccerIcon from "@material-ui/icons/SportsSoccer"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
    fontSize: "1.55em",
    fontWeight: "400"
  },
  navBarPadding: {
    padding: "0px"
  },
  small: {
    width: theme.spacing(5),
    height: theme.spacing(5)
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  linkNotClicked: {
    borderRadius: "0px"
  },
  linkClicked: {
    borderRadius: "0px",
    borderBottom: "2px solid"
  },
  links: {
    textDecoration: "none",
    fontSize: "1.14em",
    color: "white",
    margin: "0px 0px",
    padding: "14px 20px 14px 20px"
  },
  typography: {
    padding: theme.spacing(2)
  },
  button: {
    backgroundColor: "#2196f3",
    color: "white",
    textDecoration: "none",
    borderRadius: "4px"
  },
  onHover: {
    "&:hover": {
      color: "rgb(255, 255, 255, 0.6)"
    }
  }
}))

function NavBar() {
  console.log("--------------------")
  console.log("renders NavBar")
  const classes = useStyles()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.currentUser)
  const loggedIn = useSelector(state => state.user.loggedIn)
  const [linkClicked, setLinkClicked] = useState("")

  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  // const handleClose = () => {
  //   setAnchorEl(null)
  // }
  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined

  const isMenuLinkClicked = linkName => {
    return linkClicked === linkName ? classes.linkClicked : classes.linkNotClicked
  }

  const handleProfileOptions = event => {
    setLinkClicked("profile")
    handleClick(event)
  }

  // const handleLogOut = () => {
  //   handleClose()
  //   localStorage.clear()
  //   dispatch(logOutCurrentUser())
  // }

  return (
    <div>
      <AppBar position='static' color='primary'>
        <Container disableGutters>
          <Toolbar className={classes.navBarPadding}>
            <Typography variant='h1' className={classes.title}>
              Task Manager
            </Typography>
            <Link
              to='/home'
              onClick={() => setLinkClicked("Leagues")}
              className={` ${classes.links} ${classes.onHover}`}
            >
              Home
            </Link>
            <Link
              to='/project/details'
              onClick={() => setLinkClicked("Leagues")}
              className={` ${classes.links} ${classes.onHover}`}
            >
              Project
            </Link>
            <Link
              to='/task/details'
              onClick={() => setLinkClicked("Games")}
              className={` ${classes.links} ${classes.onHover}`}
            >
              Task
            </Link>
            {/* {loggedIn ? (
              <div>
                <Link
                  onClick={() => setLinkClicked("Favorites")}
                  className={`${isMenuLinkClicked("Favorites")} ${classes.links} ${
                    classes.onHover
                  }`}
                  to='/favorites'
                >
                  Favorites
                </Link>
                <Link
                  onClick={() => setLinkClicked("Friends")}
                  className={`${isMenuLinkClicked("Friends")} ${classes.links} ${classes.onHover}`}
                  to='/friends'
                >
                  {" "}
                  Friends
                </Link>
              </div>
            ) : null} */}
            {loggedIn ? (
              <>
                <Divider orientation='vertical' style={{ height: "36px" }} />
                <Link
                  onClick={() => setLinkClicked("Login")}
                  className={`${classes.links} ${classes.onHover}`}
                  style={{ display: "flex", alignItems: "center" }}
                  to='/login'
                >
                  Sign out
                </Link>
              </>
            ) : (
              <Link
                onClick={() => setLinkClicked("Login")}
                className={`${classes.links} ${classes.onHover}`}
                style={{ display: "flex", alignItems: "center" }}
                to='/login'
              >
                Login
              </Link>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

export default NavBar
