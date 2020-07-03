import React, { useState, useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import Gong1 from '../audio/gong1.mp3';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

function Countdown({ timer, interactive, HandleEditTimer }) {
  let [timeLeft, setTimeLeft] = useState(timer.time * 1000);
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
        new Notification('Stooop');
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
    let endTime = new Date(new Date().getTime() + timer.time * 1000);
    setTimeLeft(endTime - new Date());
    if (isPlaying)
      interval.current = setInterval(() => updateTimer(endTime), 1000);
  }

  let hours = Math.floor((timeLeft + 999) / 1000 / 60 / 60);
  let minutes = Math.floor((timeLeft + 999) / 1000 / 60 % 60);
  let seconds = Math.floor((timeLeft + 999) / 1000 % 60);
  return (
    <Card>
      <CardHeader
        action={
          interactive &&
          <IconButton aria-label="edit" onClick={() => HandleEditTimer(timer.id)}>
            <EditIcon />
          </IconButton>
        }
      />
      <CardContent>
        {timeLeft > 0 ?
          <div>
            {hours !== 0 &&
              <>
                <Typography variant="h3" component="span">{' ' + hours}</Typography>
                <Typography variant="subtitle1" component="span">h</Typography>
              </>
            }
            {(minutes !== 0 || hours !== 0) &&
              <>
                <Typography variant="h3" component="span">{' ' + minutes}</Typography>
                <Typography variant="subtitle1" component="span">m</Typography>
              </>
            }
            <Typography variant="h3" component="span">{' ' + seconds}</Typography>
            <Typography variant="subtitle1" component="span">s</Typography>
          </div>
          :
          <Typography variant="h3" component="div">Stooop</Typography>
        }
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
      </CardContent>
    </Card>
  )
}


function EditableCountdown({ timer, HandleDeleteTimer, timeRef, descriptionRef }) {
  return (
    <Card>
      <CardHeader
        action={
          <IconButton aria-label="delete" onClick={() => HandleDeleteTimer(timer.id)}>
            <DeleteIcon />
          </IconButton>}
        title="Edit Timer"
      />
      <CardContent>
        <TextField
          inputRef={timeRef}
          defaultValue={timer.time}
          label="Time"
          fullWidth={true}
        />
        <TextField
          inputRef={descriptionRef}
          defaultValue={timer.description}
          label="Description"
          fullWidth={true}
        />
      </CardContent>
    </Card>
  );
}


function DeletedCountdown() {
  return (
    <Card>
      <CardContent>
        <Alert severity="warning">
          <AlertTitle>Timer Deleted</AlertTitle>
          If you save the timer will be deleted
        </Alert>
      </CardContent>
    </Card>
  );
}

export { Countdown, EditableCountdown, DeletedCountdown };