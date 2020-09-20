import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

function DeletedMetricCard() {

  let classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Alert severity="warning">
          <AlertTitle>Metric Deleted</AlertTitle>
          If you save now, all the records associated with this metric will be deleted.
        </Alert>
      </CardContent>
    </Card>
  );
}

let useStyles = makeStyles((theme) => ({
  card: {
    // maxWidth: 345,
    flexGrow: 1
  },
}));

export default DeletedMetricCard;