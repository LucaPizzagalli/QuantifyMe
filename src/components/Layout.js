import React, { useState, useContext, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import PAGES from '../utils/Pages';
import UserContext from './Firebase';
import SignOutButton from './signOutButton'

function Layout({ children }) {
  let [snackPack, setSnackPack] = useState([]); //TODO move down to another component to avoid render
  
  function showAlert(message, severity = 'info') {
    setSnackPack((prev) => [...prev, { message, severity, key: new Date().getTime() }]);
  }

  return (
    <>
      <Header />
      <AlertContext.Provider value={showAlert}>
        {children}
      </AlertContext.Provider>
      <Footer snackPack={snackPack} setSnackPack={setSnackPack} />
    </>
  );
}

function Header() {
  let [isMenuOpen, setIsMenuOpen] = useState(false);
  let user = useContext(UserContext);

  let classes = useStyles();
  let menuItems = [];
  let location = useLocation().pathname;
  let titleLabel = '404 Not Found';
  for (let [key, value] of Object.entries(PAGES)) {
    if (user.isLogged() === value.logged) {
      if (location === value.to)
        titleLabel = value.label
      let item = <ListItem
        button
        selected={location === value.to}
        key={key} component={RouterLink}
        to={value.to}
        onClick={() => setIsMenuOpen(false)}>
        <ListItemIcon>
          {value.icon ? value.icon : <MailIcon />}
        </ListItemIcon>
        <ListItemText primary={value.label} />
      </ListItem>;
      menuItems.push(item);
    }
  }
  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => { setIsMenuOpen(!isMenuOpen); }}
            edge="start"
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            className={classes.logo}
            component={RouterLink}
            to="/"
            variant="h6"
            color="inherit" >
            QM
          </Typography>
          <Typography
            className={classes.title}
            variant="h6"
            color="inherit" >
            {titleLabel}
          </Typography>
          {user.isLogged() && <SignOutButton />}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={isMenuOpen}
        classes={{
          paper: classes.drawerPaper,
        }}>
        <div className={classes.drawerHeader} />
        <List>
          {menuItems}
        </List>
        {/* <Divider /> */}
      </Drawer>
      <div className={classes.drawerHeader} />
    </>
  );
}

function Footer({ snackPack, setSnackPack }) {
  let [isAlertOpen, setIsAlertOpen] = useState(false);
  let [messageInfo, setMessageInfo] = useState(undefined);
  
  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setIsAlertOpen(true);
    } else if (snackPack.length && messageInfo && isAlertOpen) {
      // Close an active snack when a new one is added
      setIsAlertOpen(false);
    }
  }, [snackPack, setSnackPack, messageInfo, isAlertOpen]);

  function handleAlertClose(e, reason) {
    console.log('dddd')
    if (reason !== 'clickaway')
      setIsAlertOpen(false);
  }

  function handleAlertExited() {
    setMessageInfo(undefined);
  }

  return (
    <Snackbar
      key={messageInfo ? messageInfo.key : undefined}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={isAlertOpen}
      autoHideDuration={3000}
      onClose={handleAlertClose}
      onExited={handleAlertExited}
    // message={messageInfo ? messageInfo.message : undefined}
    // action={
    //   <IconButton
    //     aria-label="close"
    //     color="inherit"
    //     className={classes.alertCloseIcon}
    //     onClick={handleAlertClose}
    //   >
    //     <CloseIcon />
    //   </IconButton>
    // }
    >
      <MuiAlert elevation={6} variant="filled" onClose={handleAlertClose} severity={messageInfo ? messageInfo.severity : undefined}>
        {messageInfo ? messageInfo.message : undefined}
      </MuiAlert>
    </Snackbar>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logo: {
    marginRight: theme.spacing(2),
    textDecoration: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  alertCloseIcon: {
    padding: theme.spacing(0.5),
  },
}));

let AlertContext = React.createContext(null);

export default AlertContext;
export { Layout };