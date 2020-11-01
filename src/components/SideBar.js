import React, { useState } from "react"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import InboxIcon from "@material-ui/icons/MoveToInbox"
import DraftsIcon from "@material-ui/icons/Drafts"
import DashboardIcon from "@material-ui/icons/Dashboard"
import AssignmentIcon from "@material-ui/icons/Assignment"
import DescriptionIcon from "@material-ui/icons/Description"
import GroupIcon from "@material-ui/icons/Group"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"

import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Divider from "@material-ui/core/Divider"
import { Grid, Typography } from "@material-ui/core"
import ProTaskLogo from "../img/ProTaskLogo.png"
import { Link, Redirect } from "react-router-dom"
import { logOutCurrentUser } from "../actions/user"
import { useDispatch, useSelector } from "react-redux"

import { useHistory } from "react-router-dom"

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: "gray",
    width: "100%",
    maxWidth: "14rem",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  selected: {
    height: "3.7rem",
    paddingLeft: "2rem",
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
  linkStyle: {
    textDecoration: "none",
    color: "inherit",
  },
}))

export default function CustomizedMenus() {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.currentUser)

  const handleLogOut = () => {
    if (window.confirm("Are you sure you want to Log Out?")) {
      console.log("loggin out")
      history.push("/login")
      dispatch(logOutCurrentUser())
    } else {
      console.log("canceled")
    }
  }

  return (
    <div className={classes.container}>
      <List component='nav'>
        <Grid container alignItems='center' style={{ margin: "2rem" }}>
          <img src={ProTaskLogo} alt='logo' style={{ width: "2.7rem", marginRight: "10px" }} />
          <Typography variant='h5'>ProTask</Typography>
        </Grid>
        <Link to='/dashboard' className={classes.linkStyle}>
          <ListItem button className={classes.selected}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary='Dashboard' />
          </ListItem>
        </Link>

        <Link to='/projects' className={classes.linkStyle}>
          <ListItem button className={classes.selected}>
            <ListItemIcon>
              <AssignmentTurnedInIcon />
            </ListItemIcon>
            <ListItemText primary='Projects' />
          </ListItem>
        </Link>

        <Link to='/reports' className={classes.linkStyle}>
          <ListItem button className={classes.selected}>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary='Reports' />
          </ListItem>
        </Link>

        <Link to='/team' className={classes.linkStyle}>
          <ListItem button className={classes.selected}>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary='Team' />
          </ListItem>
        </Link>

        <Link to='/inbox' className={classes.linkStyle}>
          <ListItem button className={classes.selected}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary='Inbox' />
          </ListItem>
        </Link>

        <ListItem button className={classes.selected} onClick={handleLogOut}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary='Log Out' />
        </ListItem>
      </List>

      <List component='nav'>
        <Link to='/profile' className={classes.linkStyle}>
          <ListItem button className={classes.selected}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary={`${currentUser.first_name}`} />
          </ListItem>
        </Link>
      </List>
    </div>
  )
}
