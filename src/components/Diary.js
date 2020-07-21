import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import DayCard from './DayCard';
import UserContext from './Firebase';

function Diary() {
  let user = useContext(UserContext);
  let [days, setDays] = useState(null);
  let [error, setError] = useState(null);
  let [isLoading, setIsLoading] = useState(true);
  let [refDate, setRefDate] = useState((new Date()).toISOString().slice(0, 10));
  let [cursor1, setCursor1] = useState(null);
  let [cursor2, setCursor2] = useState(null);
  let [isAsc, setIsAsc] = useState(true);

  useEffect(() => {
    user.getDaysPage(refDate, isAsc ? 'asc': 'desc', cursor1, cursor2, true, handleLoadingSuccess, handleLoadingError);
  }, [user, refDate, isAsc]);

  function handelPrevPage(){
    user.getDaysPage(refDate, isAsc ? 'asc': 'desc', cursor1, cursor2, false, handleLoadingSuccess, handleLoadingError);
  }

  function handelNextPage(){
    user.getDaysPage(refDate, isAsc ? 'asc': 'desc', cursor1, cursor2, true, handleLoadingSuccess, handleLoadingError);
  }

  function handleLoadingSuccess(newDays, newCursor1, newCursor2) {
    setDays(newDays);
    setCursor1(newCursor1);
    setCursor2(newCursor2);
    setIsLoading(false);
  }

  function handleLoadingError(error) {
    setIsLoading(false);
    setError(error);
  }

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
      <Button onClick={handelPrevPage}>prev</Button>
      <Button onClick={handelNextPage}>next</Button>
      <FormControlLabel
          value="ascending"
          control={<Switch color="primary" checked={isAsc} onChange={() => setIsAsc(!isAsc)}/>}
          label="ascending"
          // labelPlacement="top"
        />

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

let useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default Diary