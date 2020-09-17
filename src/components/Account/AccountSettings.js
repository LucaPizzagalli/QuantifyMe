import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import UserContext from '../Firebase';
import AlertContext from '../Layout';
import ChangePasswordForm from './ChangePasswordForm'

function AccountSettings() {
  let user = useContext(UserContext);
  let showAlert = useContext(AlertContext);

  function handleUpdateSuccess(message) {
    showAlert(message, 'success');
  }

  function handleUpdateError(e) {
    showAlert(e.message, 'error');
  }

  let classes = useStyles();
  return (
    <>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => user.signOut(handleUpdateSuccess, handleUpdateError)}>
          Sign Out
      </Button>
      </div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="password-change"
          id="password-change" >
          <Typography>Change Password</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordion}>
          <ChangePasswordForm />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="delete-account"
          id="delete-account" >
          <Typography>Delete Account</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordion}>
          <Alert severity="warning">
            <AlertTitle>Permanent Action</AlertTitle>
            If you decide to delete this account all of your information will be deleted, and the action is not reversible.<br />
            We suggest to export all the data before proceeding.
            <Button
              variant="contained"
              color="primary"
              onClick={() => user.deleteAccount(handleUpdateSuccess, handleUpdateError)}>
              Delete Account
            </Button>
          </Alert>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

let useStyles = makeStyles((theme) => ({
  accordion: {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
  },
}));

export default AccountSettings;