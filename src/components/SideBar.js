import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import DashboardIcon from '@material-ui/icons/Dashboard'
import DescriptionIcon from '@material-ui/icons/Description'
import GroupIcon from '@material-ui/icons/Group'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import { Grid, Typography } from '@material-ui/core'
// import ProTaskLogo from "../images/ProTaskLogo.png"
import { Link, Redirect, useLocation } from 'react-router-dom'
import { logOutCurrentUser } from '../actions/user'
import { useDispatch, useSelector } from 'react-redux'

import { useHistory } from 'react-router-dom'
import { clearCurrentProject } from '../actions/projects'
import { clearCurrentMilestone } from '../actions/milestones'
import { clearCurrentTask } from '../actions/tasks'

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: '#33435F',
    width: '100%',
    maxWidth: '14rem',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  menuItem: {
    height: '3.7rem',
    paddingLeft: '2rem',
    color: '#B5C2C9',
  },
  menuItemSelected: {
    height: '3.7rem',
    paddingLeft: '2.6rem',
    backgroundColor: theme.palette.primary.main,
    '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
      color: theme.palette.common.white,
    },
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  iconStyle: {
    color: '#B5C2C9',
  },
  linkStyle: {
    textDecoration: 'none',
    color: 'inherit',
  },
}))

export default function CustomizedMenus() {
  console.log('--------------------')
  console.log('renders SideBar')
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.currentUser)

  // const clearProject = () => {
  //   dispatch(clearCurrentProject())
  //   dispatch(clearCurrentMilestone())
  //   dispatch(clearCurrentTask())
  // }

  const handleLogOut = () => {
    if (window.confirm('Are you sure you want to Log Out?')) {
      console.log('loggin out')
      history.push('/login')
      dispatch(logOutCurrentUser())
      dispatch(clearCurrentProject())
      dispatch(clearCurrentMilestone())
      dispatch(clearCurrentTask())
    } else {
      console.log('canceled')
    }
  }

  const isSelectedStyle = name => {
    return name === location.pathname ? classes.menuItemSelected : classes.menuItem
  }

  return (
    <div className={classes.container}>
      <List component='nav'>
        <Grid container alignItems='center' style={{ margin: '2rem', color: '#fff' }}>
          {/* <img src={ProTaskLogo} alt='logo' style={{ width: '2.7rem', marginRight: '10px' }} /> */}
          <Typography variant='h5'>ProTask</Typography>
        </Grid>
        <Link to='/dashboard' className={classes.linkStyle}>
          <ListItem className={isSelectedStyle('/dashboard')}>
            <ListItemIcon className={classes.iconStyle}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary='Dashboard' />
          </ListItem>
        </Link>

        <Link to='/projects' className={classes.linkStyle}>
          <ListItem button className={isSelectedStyle('/projects')}>
            <ListItemIcon className={classes.iconStyle}>
              <AssignmentTurnedInIcon />
            </ListItemIcon>
            <ListItemText primary='Projects' />
          </ListItem>
        </Link>

        <Link to='/reports' className={classes.linkStyle}>
          <ListItem button className={isSelectedStyle('/reports')}>
            <ListItemIcon className={classes.iconStyle}>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary='Reports' />
          </ListItem>
        </Link>

        <Link to='/team' className={classes.linkStyle}>
          <ListItem button className={isSelectedStyle('/team')}>
            <ListItemIcon className={classes.iconStyle}>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary='Team' />
          </ListItem>
        </Link>

        <Link to='/inbox' className={classes.linkStyle}>
          <ListItem button className={isSelectedStyle('/inbox')}>
            <ListItemIcon className={classes.iconStyle}>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary='Inbox' />
          </ListItem>
        </Link>

        <ListItem button className={classes.menuItem} onClick={handleLogOut}>
          <ListItemIcon className={classes.iconStyle}>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary='Log Out' />
        </ListItem>
      </List>

      <List component='nav'>
        <Link to='/profile' className={classes.linkStyle}>
          <ListItem button className={isSelectedStyle('/profile')}>
            <ListItemIcon className={classes.iconStyle}>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary={`${currentUser.first_name}`} />
          </ListItem>
        </Link>
      </List>
    </div>
  )
}
