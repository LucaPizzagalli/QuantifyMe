import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import UserContext from '../components/Firebase';
import AlertContext from './Header';


function ChangePasswordForm() {
  let user = useContext(UserContext);
  let showAlert = useContext(AlertContext);
  let [passwordOne, setPasswordOne] = useState('');
  let [passwordTwo, setPasswordTwo] = useState('');
  let [isLoading, setIsLoading] = useState(false);
  let [isPasswordOneValid, setIsPasswordOneValid] = useState(true);
  let [isPasswordTwoValid, setIsPasswordTwoValid] = useState(true);
  let [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    let passwordOneValid = (passwordOne.length >= 8);
    let passwordTwoValid = (passwordTwo === passwordOne);
    setIsPasswordOneValid(passwordOneValid);
    setIsPasswordTwoValid(passwordTwoValid);
    if (passwordOneValid && passwordTwoValid) {
      setIsLoading(true);
      user.configAuth.doPasswordUpdate(passwordOne)
        .then(
          () => {
            showAlert('Password changed', 'success');
          }
        )
        .catch(error => {
          setError(error);
          setIsLoading(false);
        });
    }
  }

  let classes = useStyles();
  return (
    <form noValidate className={classes.root}>
      <TextField
        id="passwordOne"
        type="password"
        label="New Password"
        value={passwordOne}
        error={!isPasswordOneValid}
        helperText={isPasswordOneValid ? '' : 'Password too short'}
        onChange={(e) => setPasswordOne(e.target.value)}
      />
      <TextField
        id="passwordTwo"
        type="password"
        label="Confirm Password"
        value={passwordTwo}
        error={!isPasswordTwoValid}
        helperText={isPasswordTwoValid ? '' : 'Passwords are different'}
        onChange={(e) => setPasswordTwo(e.target.value)}
      />
      <div className={classes.wrapper}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          Change Password
        </Button>
        {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
      {error &&
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error.message}
        </Alert>}
    </form>
  );
}

let useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default ChangePasswordForm;
