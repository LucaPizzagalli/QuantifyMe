import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';
import Zoom from '@material-ui/core/Zoom';
import UserContext from './Firebase';
import AlertContext from '../components/Header';

function UserSettings() {
  let user = useContext(UserContext);
  let showAlert = useContext(AlertContext);
  let [theme, setTheme] = useState(user.info.theme);
  let [isEdited, setIsEdited] = useState(false);
  let [isLoading, setIsLoading] = useState(false);

  function HandleChangeTheme(newTheme) {
    setTheme(newTheme);
    user.changeTheme(newTheme);
    setIsEdited(true);
  }

  function HandleSaveMetrics() {
    setIsLoading(true);
    user.getDb().update(
      { theme: theme }
    )
      .then(() => {
        setIsEdited(false);
        setIsLoading(false);
        showAlert('Settings saved', 'success');
      })
      .catch((e) => {
        setIsLoading(false);
        showAlert(e, 'error');
      });
  }

  let classes = useStyles();
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <FormControl className={classes.field}>
        <InputLabel id="theme-label">Change App theme</InputLabel>
        <Select
          labelId="theme-label"
          id="theme-select"
          value={theme}
          onChange={(e) => HandleChangeTheme(e.target.value)}
        >
          <MenuItem value="light">Light</MenuItem>
          <MenuItem value="dark">Dark</MenuItem>
        </Select>
      </FormControl>
      <Zoom
        key="save-settings-button"
        in={isEdited}
        timeout={200}
        unmountOnExit
      >
        <Fab aria-label="Save settings" className={classes.fab} color="primary" onClick={HandleSaveMetrics}>
          {isLoading ?
            <CircularProgress color="inherit" /> :
            <SaveIcon />}
        </Fab>
      </Zoom>
    </form>
  );
}

let useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    width: '25ch',
  },
  field: {
    minWidth: '15em',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default UserSettings;