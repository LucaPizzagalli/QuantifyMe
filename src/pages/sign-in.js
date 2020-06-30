import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import UserContext from '../components/Firebase';

function SignInPage() {
  return (
    <Container fixed display="flex">
      <h1>SignIn</h1>
      <SignInForm />
      <p> Don't have an account? <Link component={RouterLink} to="/signup">Sign Up</Link> </p>
    </Container>
  );
}

function SignInForm() {
  let user = useContext(UserContext);
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [isLoading, setIsLoading] = useState(false);
  let [isEmailValid, setIsEmailValid] = useState(true);
  let [isPasswordValid, setIsPasswordValid] = useState(true);
  let [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let emailValid = regex.test(email);
    let passwordValid = (password.length >= 8);
    setIsEmailValid(emailValid);
    setIsPasswordValid(passwordValid);
    if (emailValid && passwordValid) {
      setIsLoading(true);
      user.configAuth.signInWithEmailAndPassword(email, password)
        .then(authUser => {
          console.log('yessss');
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
        id="email"
        label="Email Address"
        value={email}
        error={!isEmailValid}
        helperText={isEmailValid ? '' : 'Invalid email'}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id="password"
        type="password"
        label="Password"
        value={password}
        error={!isPasswordValid}
        helperText={isPasswordValid ? '' : 'Password too short'}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className={classes.wrapper}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          Sign In
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

export default SignInPage;
