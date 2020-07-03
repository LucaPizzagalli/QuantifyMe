import React, { useState, useContext, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';
import Zoom from '@material-ui/core/Zoom';
import UserContext from './Firebase';
import AlertContext from './Header';
import {Countdown, EditableCountdown, DeletedCountdown} from './Countdown';


function TimerList() {
  let user = useContext(UserContext);
  let showAlert = useContext(AlertContext);
  let [timers, setTimers] = useState(user.getTimers());
  let [editable, setEditable] = useState({ id: null, delete: false, new: false });
  let [isLoading, setIsLoading] = useState(false);
  let timeRef = useRef(React.createRef());
  let descriptionRef = useRef(React.createRef());

  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'denied' && Notification.permission !== 'granted')
      Notification.requestPermission();
  }, []);

  function HandleAddTimer() { //TODO fix maxID
    let maxId = 0;
    for (let timer of timers)
      maxId = Math.max(maxId, parseInt(timer.id.slice(2)));
    let newTimer = {
      id: 'id' + (maxId + 1),
      time: 0,
      description: '',
      details: []
    };
    setTimers([...timers, newTimer]);
    setEditable({ id: newTimer.id, delete: false, new: true });
  }

  function HandleEditTimer(id) {
    setEditable({ id: id, delete: false, new: false });
  }

  function HandleDeleteTimer(id) {
    setEditable({ id: id, delete: true, new: false });
  }

  function HandleSaveTimers() {
    console.log(timers)
    console.log(editable)
    setIsLoading(true);
    setEditable({ id: null, delete: false, new: false });
    let newTimers = null;
    if (editable.delete) {
      for (let [index, timer] of timers.entries())
        if (timer.id === editable.id) {
          newTimers = [...timers.slice(0, index), ...timers.slice(index + 1)];
          break;
        }
    }
    else {
      let newTimer = {
        id: editable.id,
        time: timeRef.current.value,
        description: descriptionRef.current.value,
      };
      for (let [index, timer] of timers.entries())
        if (timer.id === editable.id) {
          newTimers = [...timers.slice(0, index), newTimer, ...timers.slice(index + 1)];
          break;
        }
    }
    console.log('newTimers');
    console.log(newTimers);
    setTimers(newTimers);
    user.updateTimers(newTimers, handleUpdateTimersSuccess, handleUpdateTimersError);
  }

  function handleUpdateTimersSuccess() {
    setIsLoading(false);
    showAlert('Timers saved', 'success');
  }

  function handleUpdateTimersError(error) {
    setIsLoading(false);
    showAlert(error.message, 'error');
  }

  let classes = useStyles();
  return (
    <>
      {
        timers.map((timer, index) => {
          if (timer.id === editable.id) {
            if (editable.delete)
              return <DeletedCountdown key={timer.id} />
            else
              return <EditableCountdown
                key={timer.id}
                timer={timer}
                HandleDeleteTimer={HandleDeleteTimer}
                timeRef={timeRef}
                descriptionRef={descriptionRef} />
          }
          else
            return <Countdown
              key={timer.id}
              timer={timer}
              interactive={editable.id == null}
              HandleEditTimer={HandleEditTimer} />;
        })
      }
      <Zoom
        key="add-timer-button"
        in={editable.id == null}
        timeout={200}
        style={{
          transitionDelay: `${editable.id == null ? 200 : 0}ms`,
        }}
        unmountOnExit
      >
        <Fab aria-label="Add timer" className={classes.fab} color="primary" onClick={HandleAddTimer}>
          {isLoading ?
            <CircularProgress color="inherit" /> :
            <AddIcon />}
        </Fab>
      </Zoom>
      <Zoom
        key="save-timers-button"
        in={editable.id != null}
        timeout={200}
        style={{
          transitionDelay: `${editable.id != null ? 200 : 0}ms`,
        }}
        unmountOnExit
      >
        <Fab aria-label="Save Timers" className={classes.fab} color="primary" onClick={HandleSaveTimers}>
          <SaveIcon />
        </Fab>
      </Zoom>
    </>
  );
}

let useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default TimerList;