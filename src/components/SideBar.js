import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import { Grid, Typography } from '@material-ui/core';
import ProTaskLogo from '../img/ProTaskLogo.png'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '14vw',
    backgroundColor: 'gray',
  },
  selected: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  }
}));

export default function CustomizedMenus() {
  const classes = useStyles();

  return (  
    <div className={classes.root}>
      
      <List component="nav" >

      <Grid container alignItems='center' style={{ margin: '1rem'}}>
               <img src={ProTaskLogo} alt='logo' style={{ width: '2.7rem', marginRight: '10px'}} />
        <Typography variant='h5' >ProTask</Typography>
      </Grid>
    
        <Divider/>

        <ListItem button className={classes.selected}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem button className={classes.selected}>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem>
      </List>
    </div>


  );
}
