import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import UserContext from '../Firebase';
import AlertContext from '../Layout';

function UserSettings() {
  let user = useContext(UserContext);
  let showAlert = useContext(AlertContext);
  let [isDark, setIsDark] = useState(user.info.theme === 'dark');
  let [isLoading, setIsLoading] = useState(false);

  function handleChangeTheme(newIsDark) {
    let theme = newIsDark ? 'dark' : 'light';
    setIsDark(newIsDark);
    user.changeTheme(theme);
    setIsLoading(true);

    user.getDb().update({ theme: theme })
      .then(() => {
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
        <FormControlLabel
          value="dark-theme"
          control={
            <div className={classes.wrapper}>
              <Switch color="primary" checked={isDark} onChange={() => handleChangeTheme(!isDark)} />
              {isLoading && <CircularProgress size={30} className={classes.buttonProgress} />}
            </div>
          }
          disabled={isLoading}
          label="Dark Theme" />
      </FormControl>
    </form>
  );
}

let useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
    width: '25ch',
  },
  field: {
    minWidth: '15em',
  },
  wrapper: {
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -15,
    marginLeft: -15,
  },
}));

export default UserSettings;