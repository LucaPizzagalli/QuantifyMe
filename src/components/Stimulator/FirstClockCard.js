import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

function FirstClockCard() {

  let classes = useStyles();
  return (
    <Paper className={classes.card}>
      <Alert severity="info">
        <AlertTitle>Create your First Timer / Alarm</AlertTitle>
          Here you can create alarms to remind you to push your life forward (or log your day). You can also set a timer, to limit your break time, or to go pomodoro style.<br />
          As usual, start clicking the blue button below.
        </Alert>
    </Paper>
  );
}

let useStyles = makeStyles(theme => ({
  card: {
    // maxWidth: 345,
    flexGrow: 1
  },
}));

export default FirstClockCard;