import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import UserContext from '../Firebase';
import AlertContext from '../Layout';
import QuantifyGroup from './QuantifyGroup';
import { DayDateField, DaySubmit, DayDone, DayNoMetrics } from './AddDayCard';

function QuantifyDay() {
  let user = useContext(UserContext);
  let showAlert = useContext(AlertContext);
  let [dayInfo, setDayInfo] = useState({});
  let [date, setDate] = useState(new Date());
  let [focused, setFocused] = useState(-1);
  let [isLoading, setIsLoading] = useState(false);
  let [isDone, setIsDone] = useState(false);

  let [{ x }, setX] = useSpring(() => ({ x: 0 }));
  let bind = useDrag(({ down, movement: [mx], vxvy }) => {
    if (down)
      setX({ x: -(focused + 1) * window.innerWidth + mx });
    else if (mx > window.innerWidth / 3)
      changeFocus(focused - 1);
    else if (mx < -window.innerWidth / 3)
      changeFocus(focused + 1);
    else
      setX({ x: -(focused + 1) * window.innerWidth }); // TODO velocity
  }, { axis: 'x' })

  function changeFocus(index) {
    index = Math.min(Math.max(-1, index), user.getGroups().length);
    setFocused(index);
    setX({ x: -(index + 1) * window.innerWidth })
  }

  let groups = user.getGroups();
  let metrics = user.getMetrics();
  
  function handleSaveDay() {
    setIsLoading(true);
    let unixTime = new Date(new Date(date).toDateString()).getTime();
    for (let metricId of Object.keys(dayInfo))
      if (metrics[metricId].type === 'number')
        dayInfo[metricId] = parseFloat(dayInfo[metricId]);
    user.saveDay(unixTime, dayInfo, handleSaveDaySuccess, handleSaveDayError);
  }

  function updateDayInfo(metricId, value) {
    setDayInfo({...dayInfo, [metricId]: value});
  }

  function handleSaveDaySuccess() {
    showAlert('Day saved', 'success');
    setIsLoading(false);
    setIsDone(true);
  }

  function handleSaveDayError(error) {
    showAlert(error.message, 'error');
    setIsLoading(false);
  }

  let classes = useStyles();
  if (isDone)
    return (
      <div className={classes.cardDiv} >
        <DayDone />
      </div>);

  if (groups.length === 0)
    return (
      <div className={classes.cardDiv} >
        <DayNoMetrics />
      </div>
    );

  return (
    <animated.div {...bind()} className={classes.cardList} style={{ left: x }}>
      <div key={-1} className={classes.cardDiv} >
        <Hidden mdDown>
          <IconButton style={{ visibility: 'hidden' }}>
            <NavigateBeforeIcon classes={{ root: classes.arrow }} />
          </IconButton>
        </Hidden>
        <DayDateField
          index={-1}
          date={date}
          setDate={setDate}
        />
        <Hidden mdDown>
          <IconButton aria-label="next" color="primary" onClick={() => changeFocus(0)} >
            <NavigateNextIcon classes={{ root: classes.arrow }} />
          </IconButton>
        </Hidden>
      </div>
      { groups.map((group, index) =>
        <div key={index} className={classes.cardDiv} >
          <Hidden mdDown>
            <IconButton aria-label="previous" color="primary" onClick={() => changeFocus(index - 1)}>
              <NavigateBeforeIcon classes={{ root: classes.arrow }} style={{ color: group.color }} />
            </IconButton>
          </Hidden>
          <QuantifyGroup
            group={group}
            index={index}
            metrics={group.metrics.map(metricId => metrics[metricId])}
            values={group.metrics.map(metricId => dayInfo[metricId])}
            updateDayInfo={updateDayInfo}
          />
          <Hidden mdDown>
            <IconButton
              aria-label="next" color="primary" onClick={() => changeFocus(index + 1)} >
              <NavigateNextIcon classes={{ root: classes.arrow }} style={{ color: group.color }} />
            </IconButton>
          </Hidden>
        </div>
      )}
      <div key={metrics.length} className={classes.cardDiv} >
        <Hidden mdDown>
          <IconButton aria-label="previous" color="primary" onClick={() => changeFocus(groups.length - 1)}>
            <NavigateBeforeIcon classes={{ root: classes.arrow }} />
          </IconButton>
        </Hidden>
        <DaySubmit
          index={metrics.length}
          isLoading={isLoading}
          onSubmit={handleSaveDay}
        />
        <Hidden mdDown>
          <IconButton style={{ visibility: 'hidden' }}>
            <NavigateNextIcon classes={{ root: classes.arrow }} />
          </IconButton>
        </Hidden>
      </div>
    </animated.div >
  );
}

let useStyles = makeStyles(theme => ({
  cardList: {
    position: 'absolute',
    display: 'flex',
    userSelect: 'none',
  },
  cardDiv: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: theme.spacing(2, 2, 2, 2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3, 3, 3, 3),
    },
  },
  arrow: {
    fontSize: '5rem',
  },
}));

export default QuantifyDay;
