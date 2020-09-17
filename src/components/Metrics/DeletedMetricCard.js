import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

function DeletedMetricCard() {

  return (
    <Card>
      <CardContent>
        <Alert severity="warning">
          <AlertTitle>Metric Deleted</AlertTitle>
          If you save now, all the records associated with this metric will be deleted.
        </Alert>
      </CardContent>
    </Card>
  );
}

export default DeletedMetricCard;