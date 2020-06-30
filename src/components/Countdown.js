import React, { useState, useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Gong1 from '../audio/gong1.mp3';

function Countdown({ waitingTime }) {
  let [endTime, setEndTime] = useState(new Date(new Date().getTime() + waitingTime * 1000));
  let [timeLeft, setTimeLeft] = useState(endTime - new Date());
  let interval = useRef();
  let [audio] = useState(new Audio(Gong1));

  useEffect(() => {
    interval.current = setInterval(updateTimer, 1000);
    return () => clearInterval(interval.current);
  }, [endTime]);

  function updateTimer() {
    let newTimeLeft = endTime - new Date();
    setTimeLeft(newTimeLeft);
    if (newTimeLeft <= 0) {
      clearInterval(interval.current);
      audio.play();
    }
  }

  function restartTimer(e) {
    let newEndTime = new Date(new Date().getTime() + waitingTime * 1000);
    setEndTime(newEndTime);
    setTimeLeft(newEndTime - new Date());
  }

  let counter = null;
  if (timeLeft > 0)
    counter = <div>
      minutes: {Math.floor((timeLeft + 999) / 1000 / 60)}
      seconds: {Math.floor((timeLeft + 999) / 1000 % 60)}
    </div>;
  else
    counter = <div> stoop </div>;
  return (
    <>
      {counter}
      <Button variant="contained" color="primary" onClick={restartTimer} >
        Reset
      </Button>
      <Button variant="contained" color="primary" onClick={pauseTimer} >
        Pause
      </Button>
    </>
  )
}

export default Countdown;