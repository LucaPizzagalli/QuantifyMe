import React from 'react';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

function DayNoMetrics() {
  return (
    <Paper>
      <Alert severity="info">
        <AlertTitle>There are no metrics yet</AlertTitle>
        Here you can log all the info you want about today, but first you need to create a metric! <br />
        Go <Link component={RouterLink} to="/metrics">here</Link> to create one.
      </Alert>
    </Paper>
  );
}

export default DayNoMetrics;