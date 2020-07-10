import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import UserContext from '../components/Firebase';
import AlertContext from './Header';


function DeleteAccountForm() {
  let user = useContext(UserContext);
  let showAlert = useContext(AlertContext);
  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState(null);
  let [isUnsure, setIsUnsure] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    // db.collection("users").document(FirebaseAuth.getInstance().currentUser.uid).delete()
    // FirebaseAuth.getInstance().currentUser!!.delete().addOnCompleteListener
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

  let classes = useStyles();
  if (isUnsure)
    return (
      <form noValidate className={classes.root}>
        <div className={classes.wrapper}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            onClick={handleSubmit} >
            Delete Account
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
  return (
    <form noValidate className={classes.root}>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={() => setIsUnsure(true)} >
        Delete Account
          </Button>
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
