import React from 'react'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardIcon from '@mui/icons-material/Dashboard'
import DescriptionIcon from '@mui/icons-material/Description'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
// import InboxIcon from '@mui/icons-material/MoveToInbox'
// import GroupIcon from '@mui/icons-material/Group'
// import EventAvailableIcon from '@mui/icons-material/EventAvailable'

import { makeStyles } from '@mui/styles'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { Grid, Typography } from '@mui/material'
import ProTaskLogo from '../img/ProTaskLogo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logOutCurrentUser } from '../redux/actions/user'
import { clearCurrentProject } from '../redux/actions/projects'
import { clearCurrentMilestone } from '../redux/actions/milestones'
import { clearCurrentTask } from '../redux/actions/tasks'

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
    paddingLeft: '2rem',
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
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const clearProjects = () => {
    dispatch(clearCurrentProject())
    dispatch(clearCurrentMilestone())
    dispatch(clearCurrentTask())
  }

  const handleLogOut = () => {
    if (window.confirm('Are you sure you want to Log Out?')) {
      console.log('loggin out')
      navigate('/login')
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
          <img src={ProTaskLogo} alt='logo' style={{ width: '2.7rem', marginRight: '10px' }} />
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

        <Link to='/projects' className={classes.linkStyle} onClick={clearProjects}>
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

        {/* <Link to='/calendar' className={classes.linkStyle}>
          <ListItem button className={isSelectedStyle('/calendar')}>
            <ListItemIcon className={classes.iconStyle}>
              <EventAvailableIcon />
            </ListItemIcon>
            <ListItemText primary='Calendar' />
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
        </Link> */}

        {/* <Link to='/inbox' className={classes.linkStyle}>
          <ListItem button className={isSelectedStyle('/inbox')}>
            <ListItemIcon className={classes.iconStyle}>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary='Inbox' />
          </ListItem>
        </Link> */}

        <Link to='/profile' className={classes.linkStyle}>
          <ListItem button className={isSelectedStyle('/profile')}>
            <ListItemIcon className={classes.iconStyle}>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary='Profile' />
          </ListItem>
        </Link>

        <ListItem button className={classes.menuItem} onClick={handleLogOut}>
          <ListItemIcon className={classes.iconStyle}>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary='Log Out' />
        </ListItem>
      </List>
    </div>
  )
}
