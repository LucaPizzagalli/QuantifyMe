import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import UISettings from './UISettings'
import AccountSettings from './AccountSettings'

function UserSettings() {
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
          aria-controls="account"
          id="account" >
          <Typography>Account Settings</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordion}>
          <AccountSettings />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="export-data"
          id="export-data" >
          <Typography>Export Data</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordion}>
          Function not yet unavailable
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