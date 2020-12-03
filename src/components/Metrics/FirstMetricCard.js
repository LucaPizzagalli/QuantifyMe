import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

function FirstMetricCard() {

  let classes = useStyles();
  return (
    <Paper className={classes.card}>
      <Alert severity="info">
        <AlertTitle>Create your first Metric</AlertTitle>
          A metric is something you want to keep track of. A metric can be the number of hours you studied today, or how many km you run, how you feel... Every day you'll then be able to log all of this information and keep track of your life.<br />
          At first we suggest to start simple, with just 1-3 basic metrics, you can always expand after you'll get the feel.<br />
          Start creating your first metric, press the plus button!
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

export default FirstMetricCard;