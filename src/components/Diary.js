import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import UserContext from './Firebase';
import DayCard from './DayCard';
import Paper from '@material-ui/core/Paper';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

function Diary() {
  let user = useContext(UserContext);
  let [days, setDays] = useState(null);
  let [error, setError] = useState(null);
  let [isLoading, setIsLoading] = useState(true);
  // let [refDate, setRefDate] = useState((new Date()).toISOString().slice(0, 10));
  let [refDate, setRefDate] = useState(null);
  let [cursor1, setCursor1] = useState(null);
  let [cursor2, setCursor2] = useState(null);
  let [isAsc, setIsAsc] = useState(false);

  useEffect(() => {
    user.getDaysPage(refDate, isAsc ? 'asc' : 'desc', null, true, handleLoadingSuccess, handleLoadingError);
  }, [user, refDate, isAsc]);

  function handelPrevPage() {
    user.getDaysPage(refDate, isAsc ? 'asc' : 'desc', cursor1, false, handleLoadingSuccess, handleLoadingError);
  }

  function handelNextPage() {
    user.getDaysPage(refDate, isAsc ? 'asc' : 'desc', cursor2, true, handleLoadingSuccess, handleLoadingError);
  }

  function handleLoadingSuccess(newDays, newCursor1, newCursor2) {
    if (newDays.length > 0) {
      setDays(newDays);
      setCursor1(newCursor1);
      setCursor2(newCursor2);
    }
    setIsLoading(false);
  }

  function handleLoadingError(error) {
    setIsLoading(false);
    setError(error);
  }

  let classes = useStyles();
  if (isLoading)
    return (
      <div style={{
        display: 'flex',
        flexGrow: '1',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
      }}>
        <CircularProgress size="5rem" />
      </div>
    );
  if (error) {
    return (
      <Paper>
        <Alert severity="error">
          <AlertTitle>Failed to load the diary</AlertTitle>
          {error.message}
        </Alert>
      </Paper>
    );
  }
  if (days) {
    return (
      <div className={classes.root}>
        <Button onClick={handelPrevPage}>prev</Button>
        <Button onClick={handelNextPage}>next</Button>
        <FormControlLabel
          value="ascending"
          control={<Switch color="primary" checked={isAsc} onChange={() => setIsAsc(!isAsc)} />}
          label="ascending" />

        <Grid container spacing={3} style={{ marginTop: '1rem' }}>
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
  return (
    <Paper>
      <Alert severity="info">
        <AlertTitle>No Days Recorded</AlertTitle>
        Apparently you never recorded a day<br />
        Go <Link component={RouterLink} to="/quantify-day">here</Link> and start now with today!
      </Alert>
    </Paper>
  );
}

let useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default Diary