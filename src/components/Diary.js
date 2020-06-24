import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Grid from '@material-ui/core/Grid';
import DayCard from './DayCard';
import UserContext from './Firebase';

function Diary() {
  let user = useContext(UserContext);
  let [days, setDays] = useState(null);
  let [error, setError] = useState(null);
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    user.getDb().collection('days').limit(10).get()
      .then((querySnapshot) => {
        let newDays = [];
        querySnapshot.forEach((doc) => {
          newDays.push({ date: doc.id, ...(doc.data()) });
        });
        setDays(newDays);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e);
      });
  }, [user]);

  let classes = useStyles();
  if (isLoading)
    return (<CircularProgress />);
  if (error) {
    return (
      <Alert severity="error">
        <AlertTitle>Failed to load the diary</AlertTitle>
        {error.message}
      </Alert>
    );
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {days.map((day) => {
          return (
            <Grid key={day.date} item xs={12} md={6} xl={4}>
              <DayCard metrics={user.info.metrics} day={day} />
            </Grid>
          )
        })}
      </Grid></div>
  );
}

let useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default Diary