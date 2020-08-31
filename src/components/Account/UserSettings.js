import React, { useContext } from 'react';
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

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="theme-options"
          id="theme-options" >
          <Typography >Theme Options</Typography>
        </AccordionSummary>
        <AccordionDetails>
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
        <AccordionDetails>
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
        <AccordionDetails>
          <button onClick={() => showAlert('YESS')}>Just show a message</button>
        </AccordionDetails>
      </Accordion>
    </>
  );
}


export default UserSettings;