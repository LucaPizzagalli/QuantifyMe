import React, { useState, useContext, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';
import Zoom from '@material-ui/core/Zoom';
import UserContext from '../Firebase';
import AlertContext from '../Layout';
import { Timer, EditableClock, DeletedClock } from './ClockCard';
import FirstClockCard from './FirstClockCard';
import IconButton from '@material-ui/core/IconButton';
import { SwitchIcon } from '../Icons';


function ClockList() {
  let user = useContext(UserContext);
  let showAlert = useContext(AlertContext);
  let [clocks, setClocks] = useState(user.getClocks());
  let [editable, setEditable] = useState({ id: null, delete: false, new: false });
  let [isLoading, setIsLoading] = useState(false);
  let typeRef = useRef(React.createRef());
  let timeRef = useRef(React.createRef());
  let descriptionRef = useRef(React.createRef());

  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'denied' && Notification.permission !== 'granted')
      Notification.requestPermission();
  }, []);

  function HandleAddClock() {
    let maxId = -1;
    for (let clock of clocks)
      maxId = Math.max(maxId, parseInt(clock.id.slice(2)));
    let newClock = {
      id: 'id' + (maxId + 1),
      type: 'timer',
      time: 0,
      description: '',
    };
    setClocks([...clocks, newClock]);
    setEditable({ id: newClock.id, delete: false, new: true });
  }

  function HandleEditClock(id) {
    setEditable({ id: id, delete: false, new: false });
  }

  function HandleDeleteClock(id) {
    setEditable({ id: id, delete: true, new: false });
  }

  function HandleSwapClocks(index1, index2) {
    let newClocks = [...clocks];
    newClocks[index1] = clocks[index2];
    newClocks[index2] = clocks[index1];
    setClocks(newClocks);
    if (!editable.id)
      setEditable({ id: -1, delete: false, new: false });
  }

  function HandleSaveClocks() {
    setIsLoading(true);
    let newClocks = null;
    if (editable.delete) {
      for (let [index, clock] of clocks.entries())
        if (clock.id === editable.id) {
          newClocks = [...clocks.slice(0, index), ...clocks.slice(index + 1)];
          break;
        }
    }
    else {
      let newClock = {
        id: editable.id,
        type: typeRef.current.value,
        time: Number(timeRef.current.value),
        description: descriptionRef.current.value,
      };
      for (let [index, clock] of clocks.entries())
        if (clock.id === editable.id) {
          newClocks = [...clocks.slice(0, index), newClock, ...clocks.slice(index + 1)];
          break;
        }
    }
    setEditable({ id: null, delete: false, new: false });
    setClocks(newClocks);
    user.updateClocks(newClocks, handleUpdateClocksSuccess, handleUpdateClocksError);
  }

  function handleUpdateClocksSuccess() {
    setIsLoading(false);
    showAlert('Clocks saved', 'success');
  }

  function handleUpdateClocksError(error) {
    setIsLoading(false);
    showAlert(error.message, 'error');
  }

  let classes = useStyles();
  let ids = [];
  let statics = [];
  let clockCards = clocks.map(clock => {
    ids.push(clock.id);
    if (clock.id === editable.id) {
      statics.push(clock.id);
      if (editable.delete)
        return <DeletedClock key={clock.id} />
      else
        return <EditableClock
          key={clock.id}
          clock={clock}
          isNew={editable.new}
          HandleDeleteClock={HandleDeleteClock}
          timeRef={timeRef}
          typeRef={typeRef}
          descriptionRef={descriptionRef} />
    }
    else if (clock.type === 'timer')
      return <Timer
        key={clock.id}
        clock={clock}
        interactive={editable.id == null}
        HandleEditClock={HandleEditClock} />;
    else if (clock.type === 'alarm')
      return null;
    else if (clock.type === 'stopWatch')
      return null;
    else
      return null;
  });

  if (clockCards.length === 0)
    clockCards = [<FirstClockCard />];

  return (
    <div className={classes.cardList}>
      { clockCards.map((card, index) =>
        [
          index > 0 &&
            <IconButton key={'swap-' + index}
              aria-label="swap" variant="contained" onClick={() => HandleSwapClocks(index - 1, index)} >
              <SwitchIcon variant="contained" />
            </IconButton>,
          card
        ]
      )}
      <Zoom
        key="add-clock-button"
        in={editable.id == null}
        timeout={200}
        style={{
          transitionDelay: `${editable.id == null ? 200 : 0}ms`,
        }}
        unmountOnExit
      >
        <Fab aria-label="Add clock" className={classes.fab} color="primary" onClick={HandleAddClock}>
          {isLoading ?
            <CircularProgress color="inherit" /> :
            <AddIcon />}
        </Fab>
      </Zoom>
      <Zoom
        key="save-clocks-button"
        in={editable.id != null}
        timeout={200}
        style={{
          transitionDelay: `${editable.id != null ? 200 : 0}ms`,
        }}
        unmountOnExit
      >
        <Fab aria-label="Save Clocks" className={classes.fab} color="primary" onClick={HandleSaveClocks}>
          <SaveIcon />
        </Fab>
      </Zoom>
    </div>
  );
}

let useStyles = makeStyles(theme => ({
  cardList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default ClockList;