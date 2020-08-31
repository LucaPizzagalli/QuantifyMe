import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AlertContext from '../Layout';
import ChangePasswordForm from './ChangePasswordForm'
import UISettings from './UISettings'

function UserSettings() {
  let showAlert = useContext(AlertContext);

  let classes = useStyles();
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="theme-options"
          id="theme-options" >
          <Typography >Theme Options</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordion}>
          <UISettings />
        </AccordionDetails>
      </Accordion>
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
          aria-controls="random"
          id="random" >
          <Typography>Random</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordion}>
          <button onClick={() => showAlert('YESS')}>Just show a message</button>
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

export default UserSettings;