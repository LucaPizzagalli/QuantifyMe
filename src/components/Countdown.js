import React, { useReducer, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

function Countdown({ waitingTime }) {
  let [endTime, setEndTime] = useState(new Date(new Date().getTime() + waitingTime * 1000));
  let [state, dispatch] = useReducer(reducer, { 'timeLeft': (endTime - new Date()) });

  function reducer(state, action) {
    switch (action.type) {
      case 'updateTimeLeft':
        return { 'timeLeft': (endTime - new Date()) };
      default:
        throw new Error();
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ 'type': 'updateTimeLeft' });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function handleClick(event) {
    setEndTime(new Date(new Date().getTime() + waitingTime * 1000));
  }

  let counter = null;
  if (state.timeLeft > 0)
    counter = <div>
      minutes: {Math.floor(state.timeLeft / 1000 / 60)}
      seconds: {Math.floor(state.timeLeft / 1000 % 60)}
    </div>;
  else
    counter = <div> stoop
      </div>;
  return (
    <>
      {counter}
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Reset
      </Button>
    </>
  )
}

export default Countdown;