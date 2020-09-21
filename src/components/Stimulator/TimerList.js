import React, { useState, useContext, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';
import Zoom from '@material-ui/core/Zoom';
import UserContext from '../Firebase';
import AlertContext from '../Layout';
import DraggableList from '../DraggableList.js'
import { Timer, EditableCountdown, DeletedCountdown } from './Countdown';


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

  function HandleAddClock() { //TODO fix maxID
    let maxId = 0;
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

  function HandleSaveClocks() {
    setIsLoading(true);
    setEditable({ id: null, delete: false, new: false });
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
      console.log(newClock)
      for (let [index, clock] of clocks.entries())
        if (clock.id === editable.id) {
          newClocks = [...clocks.slice(0, index), newClock, ...clocks.slice(index + 1)];
          break;
        }
    }
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
  return (
    <>
      <DraggableList padding={20}>
        {
          clocks.map(clock => {
            if (clock.id === editable.id) {
              if (editable.delete)
                return <DeletedCountdown key={clock.id} />
              else
                return <EditableCountdown
                  key={clock.id}
                  clock={clock}
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
          })
        }
      </DraggableList>
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

export default ClockList;