import React, { useState, useContext, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import UserContext from '../Firebase';
import AlertContext from '../Layout';
import { DayTextField, DayRatingField, DayNumberField, DayDateField, DaySubmit, DayDone, DayNoMetrics } from './AddDayCard';

function AddDayList() {
  let user = useContext(UserContext);
  let showAlert = useContext(AlertContext);
  let refs = useRef(user.info.metrics.map(() => React.createRef()));
  let refDate = useRef(React.createRef());
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

  let changeFocus = (index) => {
    index = Math.min(Math.max(-1, index), user.info.metrics.length);
    setFocused(index);
    setX({ x: -(index + 1) * window.innerWidth })
  }

  function handleSaveDay() {
    setIsLoading(true);
    let newDay = {}
    for (let [index, metric] of user.info.metrics.entries()) {
      if (newDay[metric.id] !== '-1' && newDay[metric.id] !== '') {
        newDay[metric.id] = refs.current[index].current.value;
        if (metric.type === 'rating' || metric.type === 'number')
          newDay[metric.id] = parseInt(newDay[metric.id]);
      }
    }
    let date = new Date(new Date(refDate.current.value).toDateString()).getTime();
    console.log(refDate.current.value)
    console.log(new Date(new Date(refDate.current.value).toDateString()))
    console.log(date)
    user.saveDay(date, newDay, handleSaveDaySuccess, handleSaveDayError);
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

  if (user.info.metrics.length === 0)
    return (
      <div className={classes.cardDiv} >
        <DayNoMetrics />
      </div>);

  let cards = [];
  let colors = [];
  cards.push(
    <DayDateField
      reference={refDate}
      index={-1}
      isFocused={focused === -1}
      changeFocus={changeFocus}
    />
  );
  colors.push(null);
  for (let [index, metric] of user.info.metrics.entries()) {
    if (metric.type === 'rating')
      cards.push(
        <DayRatingField
          metric={metric}
          reference={refs.current[index]}
          index={index}
          changeFocus={changeFocus}
          isFocused={focused === index}
        />
      );
    else if (metric.type === 'text')
      cards.push(
        <DayTextField
          metric={metric}
          reference={refs.current[index]}
          index={index}
          changeFocus={changeFocus}
          isFocused={focused === index}
        />
      );
    else if (metric.type === 'number')
      cards.push(
        <DayNumberField
          metric={metric}
          reference={refs.current[index]}
          index={index}
          changeFocus={changeFocus}
          isFocused={focused === index}
        />
      );
    colors.push(metric.color[0])
  }
  cards.push(
    <DaySubmit
      index={user.info.metrics.length}
      changeFocus={changeFocus}
      isFocused={focused === user.info.metrics.length}
      onSubmit={handleSaveDay}
      isLoading={isLoading} />
  );



  return (
    <animated.div {...bind()} className={classes.cardList} style={{ left: x }}>
      { cards.map((card, index) =>
        <div key={index} className={classes.cardDiv} >
          <Hidden mdDown>
            <IconButton style={index === 0 ? { visibility: 'hidden' }: {}}
             aria-label="previous" color="primary" onClick={() => changeFocus(index - 2)}>
              <NavigateBeforeIcon classes={{ root: classes.arrow }} style={{ color: colors[index] }}/>
            </IconButton>
          </Hidden>
          {card}
          <Hidden mdDown>
            <IconButton style={index === cards.length - 1 ? { visibility: 'hidden' }: {}}
            aria-label="next" color="primary" onClick={() => changeFocus(index)} >
              <NavigateNextIcon classes={{ root: classes.arrow }} style={{ color: colors[index] }} />
            </IconButton>
          </Hidden>
        </div>
      )
      }
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

export default AddDayList;
