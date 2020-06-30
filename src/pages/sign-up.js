import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import UserContext from '../components/Firebase';

function SignUpPage() {
  return (
    <Container fixed display="flex">
      <h1>SignUp</h1>
      <SignUpForm />
    </Container>
  );
}

function SignUpForm() {
  let user = useContext(UserContext);
  let [email, setEmail] = useState('');
  let [passwordOne, setPasswordOne] = useState('');
  let [passwordTwo, setPasswordTwo] = useState('');
  let [isLoading, setIsLoading] = useState(false);
  let [isEmailValid, setIsEmailValid] = useState(true);
  let [isPasswordOneValid, setIsPasswordOneValid] = useState(true);
  let [isPasswordTwoValid, setIsPasswordTwoValid] = useState(true);
  let [error, setError] = useState(null);


  function handleSubmit(e) {
    e.preventDefault();
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let emailValid = regex.test(email);
    let passwordOneValid = (passwordOne.length >= 8);
    let passwordTwoValid = (passwordTwo === passwordOne);
    setIsEmailValid(emailValid);
    setIsPasswordOneValid(passwordOneValid);
    setIsPasswordTwoValid(passwordTwoValid);
    if (emailValid && passwordOneValid && passwordTwoValid) {
      setIsLoading(true);
      user.configAuth.createUserWithEmailAndPassword(email, passwordOne)
        .then(
          () => {
            console.log('Yes Up');
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
        id="passwordOne"
        type="password"
        label="Password"
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
          Sign Up
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

export default SignUpPage;