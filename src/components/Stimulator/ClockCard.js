import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TimerIcon from '@material-ui/icons/Timer';
import AlarmIcon from '@material-ui/icons/Alarm';
import HourglassEmptyRoundedIcon from '@material-ui/icons/HourglassEmptyRounded';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import Gong1 from '../../audio/gong1.mp3';
import { Paper } from '@material-ui/core';


function Timer({ clock, interactive, HandleEditClock }) {
  let [timeLeft, setTimeLeft] = useState(clock.time);
  let [isPlaying, setIsPlaying] = useState(false);
  let interval = useRef();
  let [audio] = useState(new Audio(Gong1));

  useEffect(() => {
    return () => clearInterval(interval.current);
  }, []);

  function updateTimer(endTime) {
    let newTimeLeft = endTime - new Date();
    setTimeLeft(newTimeLeft);
    if (newTimeLeft <= 0) {
      pauseTimer();
      audio.play();
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(clock.description);
      }
    }
  }

  function pauseTimer() {
    clearInterval(interval.current);
    setIsPlaying(false);
  }

  function playTimer() {
    let endTime = new Date(new Date().getTime() + timeLeft);
    interval.current = setInterval(() => updateTimer(endTime), 1000);
    setIsPlaying(true);
  }

  function restartTimer() {
    clearInterval(interval.current);
    let endTime = new Date(new Date().getTime() + clock.time);
    setTimeLeft(endTime - new Date());
    if (isPlaying)
      interval.current = setInterval(() => updateTimer(endTime), 1000);
  }

  let classes = useStyles();
  let hours = Math.floor((timeLeft + 999) / 1000 / 60 / 60);
  let minutes = Math.floor((timeLeft + 999) / 1000 / 60 % 60);
  let seconds = Math.floor((timeLeft + 999) / 1000 % 60);
  return (
    <Paper className={classes.card}>
      {timeLeft > 0 ?
        <div>
          {hours !== 0 && <>
            <Typography variant="h3" component="span">{' ' + hours}</Typography>
            <Typography variant="subtitle1" component="span">h</Typography>
          </>}
          {(minutes !== 0 || hours !== 0) && <>
            <Typography variant="h3" component="span">{' ' + minutes}</Typography>
            <Typography variant="subtitle1" component="span">m</Typography>
          </>}
          <Typography variant="h3" component="span">{' ' + seconds}</Typography>
          <Typography variant="subtitle1" component="span">s</Typography>
        </div>
        :
        <Typography variant="h3" component="div">Stop</Typography>
      }

      <div>
        <Button variant="contained" color="primary" onClick={restartTimer} >
          Reset
        </Button>
        {timeLeft > 0 && (isPlaying ?
          <Button variant="contained" color="primary" onClick={pauseTimer} >
            Pause
          </Button>
          :
          <Button variant="contained" color="primary" onClick={playTimer} >
            Play
          </Button>
        )}
        <Typography variant="body1">{clock.description}</Typography>
      </div>
      { interactive &&
        <IconButton aria-label="edit" onClick={() => HandleEditClock(clock.id)} className={classes.edit}>
          <EditIcon />
        </IconButton>
      }
    </Paper>
  )
}


function EditableClock({ clock, isNew, HandleDeleteClock, typeRef, timeRef, descriptionRef }) {
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  let oldTime = new Date();
  oldTime.setHours(0, 0, 0, clock.time);
  let typeMapping = { 'timer': 0, 'alarm': 1, 'stopwatch': 2 };
  let mappingType = { 0: 'timer', 1: 'alarm', 2: 'stopwatch' };
  let [timer, setTimer] = useState(clock.type === 'timer' ? oldTime : today);
  let [alarm, setAlarm] = useState(clock.type === 'alarm' ? oldTime : new Date());
  let [type, setType] = useState(typeMapping[clock.type]);

  let classes = useStyles();
  return (
    <Paper className={classes.card}>
      {isNew &&
        <Tabs
          value={type}
          onChange={(_, newType) => setType(newType)}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          aria-label="clock-types"
        >
          <Tab id="timer" aria-controls="timer" icon={<HourglassEmptyRoundedIcon />} aria-label="timer" />
          <Tab id="alarm" aria-controls="alarm" icon={<AlarmIcon />} aria-label="alarm" />
          <Tab id="stopwatch" aria-controls="stopwatch" icon={<TimerIcon />} aria-label="stopwatch" />
        </Tabs>
      }
      {!isNew &&
        <IconButton aria-label="delete" onClick={() => HandleDeleteClock(clock.id)} className={classes.edit}>
          <DeleteIcon />
        </IconButton>
      }
      <input value={mappingType[type] === 'timer' ? timer.getTime() - today.getTime() : alarm.getTime() - today.getTime()} ref={timeRef} type="hidden" />
      <input value={mappingType[type]} ref={typeRef} type="hidden" />
      {mappingType[type] === 'timer' &&
        <div className={classes.tab}>
          <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <TimePicker
                ampm={false}
                autoOk
                variant="static"
                views={['hours', 'minutes', 'seconds']}
                openTo="minutes"
                value={timer}
                onChange={setTimer}
              />
            </MuiPickersUtilsProvider>
          </div>
          <TextField
            inputRef={descriptionRef}
            defaultValue={clock.description}
            label="Description"
            fullWidth={true} />
        </div>}
      {mappingType[type] === 'alarm' &&
        <div className={classes.tab}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <TimePicker
              ampm={false}
              autoOk
              variant="static"
              openTo="hours"
              value={alarm}
              onChange={setAlarm}
            />
          </MuiPickersUtilsProvider>
          <TextField
            inputRef={descriptionRef}
            defaultValue={clock.description}
            label="Description"
            fullWidth={true} />
        </div>}
      {mappingType[type] === 'stopwatch' &&
        <div className={classes.tab}>
          <TextField
            inputRef={descriptionRef}
            defaultValue={clock.description}
            label="Description"
            fullWidth={true} />
        </div>}
    </Paper>
  );
}


function DeletedClock() {
  let classes = useStyles();
  return (
    <Paper className={classes.card}>
      <Alert severity="warning">
        <AlertTitle>Timer Deleted</AlertTitle>
            The clock will be deleted upon saving.
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
  tab: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  edit: {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
  },
}));


export { Timer, EditableClock, DeletedClock };