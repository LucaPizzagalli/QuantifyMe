import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

function DeletedMetricCard() {

  let classes = useStyles();
  return (
    <Paper className={classes.card}>
        <Alert severity="warning">
          <AlertTitle>Metric Deleted</AlertTitle>
          If you save now, all the records associated with this metric will be deleted.
        </Alert>
    </Paper>
  );
}

let useStyles = makeStyles(theme => ({
  card: {
    width: '100%',
    position: 'relative',
    display: 'flex',
    padding: '1rem 2rem 1rem 2rem',
    flexDirection: 'column',
  },
}));

export default DeletedMetricCard;