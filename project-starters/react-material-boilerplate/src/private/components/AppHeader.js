import React from 'react';
import { withRouter } from 'react-router';
import { withStyles } from 'material-ui/styles';
import PRIVATE_PAGE_STYLE from '../styles/privatePageStyle';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import UserInfo from './UserInfo.js';

const AppHeader = props =>
  <AppBar position="static">
    <Toolbar>
      <IconButton aria-label="Menu">
        <MenuIcon />
      </IconButton>
      <Typography type="title" color="inherit" className={props.classes.flex}>
        AppStarter
      </Typography>
      <UserInfo />
    </Toolbar>
  </AppBar>;

export default withStyles(PRIVATE_PAGE_STYLE)(withRouter(AppHeader));
