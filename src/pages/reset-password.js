import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import UserContext from '../components/Firebase';

function ResetPasswordPage() {
  return (
    <Container maxWidth="md" display="flex">
      <h1>Reset Password</h1>
      <ResetPasswordForm />
    </Container>
  );
}

function ResetPasswordForm() {
  let user = useContext(UserContext);
  let [email, setEmail] = useState('');
  let [isEmailValid, setIsEmailValid] = useState(true);
  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let emailValid = regex.test(email);
    setIsEmailValid(emailValid);
    if (emailValid) {
      setIsLoading(true);
      user.configAuth.sendPasswordResetEmail(email)
        .then(authUser => {
          setError(null);
          setIsLoading(false);
        }
        )
        .catch(error => {
          setError(error);
          setIsLoading(false);
        });
    }
  };

  const classes = useStyles();

  return (
    <form noValidate className={classes.root}>
      <TextField
        id="email"
        label="Email Address"
        value={email}
        error={!isEmailValid}
        helperText={isEmailValid ? '' : 'Invalid email'}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className={classes.wrapper}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          Reset Password
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

let useStyles = makeStyles(theme => ({
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

export default ResetPasswordPage;