import React, { useState, useContext, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import DayCard from './DayCard';
import UserContext from './Firebase';
import AlertContext from './Header';

function Diary() {
  let user = useContext(UserContext);
  let showAlert = useContext(AlertContext);
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
    <>
      {days.map((day) => {
        return <DayCard key={day.date} metrics={user.info.metrics} day={day} />
      })}
    </>
  );
}

export default Diary