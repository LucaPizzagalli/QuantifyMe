import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Loading from './loading'
import UserContext from '../components/Firebase';
import AlertContext from '../components/Layout';
import LifeCalendar from '../components/LifeCalendar';

function MetricsPage() {
  let user = useContext(UserContext);
  let showAlert = useContext(AlertContext);
  let [birthday, setBirthday] = useState(user.getLifespan()[0] ? user.getLifespan()[0] : new Date());
  let [deathAge, setDeathAge] = useState(user.getLifespan()[1] ? user.getLifespan()[1] : 90);
  let [isReady, setIsReady] = useState(user.getLifespan()[0] && user.getLifespan()[1]);
  let [isLoading, setIsLoading] = useState(false);

  function handleSubmit() {
    setIsLoading(true);
    user.setLifespan(birthday, deathAge, handleSetLifespanSuccess, handleSetLifespanError);
  }

  function handleSetLifespanSuccess() {
    setIsLoading(false);
    showAlert('Info saved', 'success');
    setIsReady(true);
  }

  function handleSetLifespanError(error) {
    setIsLoading(false);
    showAlert(error.message, 'error');
  }

  let classes = useStyles();
  if (isLoading)
    return <Loading />;
  if (isReady)
    return (
      <Container maxWidth="xl">
        <LifeCalendar />
      </Container>
    );
  return (
    <Container fixed display="flex">
      <form noValidate className={classes.root}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} >
          <DatePicker
            autoOk
            disableFuture
            label="Your birthday"
            onChange={(input) => setBirthday(input)}
            format='yyyy/MM/dd'
            value={birthday}
          />
        </MuiPickersUtilsProvider>
        <TextField
          id="lifeExpectancy"
          type="number"
          inputProps={{ min: '1', max: '150', step: '1' }}
          label="Your life expectancy"
          value={deathAge.toString()}
          onChange={(e) => { if (isNaN(e.target.valueAsNumber)) setDeathAge(0); else setDeathAge(Math.min(150, Math.max(1, e.target.valueAsNumber))) }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Create Life Calendar
        </Button>
      </form>
    </Container>
  );
}

let useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default MetricsPage;