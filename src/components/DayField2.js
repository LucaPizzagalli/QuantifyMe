import React, { useState, useContext, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { useSprings, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import UserContext from './Firebase';
import AlertContext from './Header';
import { DayTextField, DayRatingField, DayDateField, DaySubmit } from './AddDayField';

function AddDayForm() {
  let user = useContext(UserContext);
  let showAlert = useContext(AlertContext);
  let refs = useRef(user.info.metrics.map(() => React.createRef()));
  let refDate = useRef(React.createRef());
  let [focused, setFocused] = useState(0);
  let [isLoading, setIsLoading] = useState(false);

  let [props, set] = useSprings(user.info.metrics.length, (index) => ({
    x: index * window.innerWidth,
    display: 'block'
  }));
  let bind = useDrag(({ down, movement: [mx], cancel }) => {
    if (down && Math.abs(mx) > window.innerWidth / 3) {
      cancel();
      setFocused(Math.min(Math.max(focused + (mx > 0 ? -1 : 1), 0), user.info.metrics.length - 1));
    }
    set((index) => {
      if (index < focused - 1 || index > focused + 1)
        return { display: 'none' }
      let x = (index - focused) * window.innerWidth + (down ? mx : 0)
      return { x, display: 'block' }
    });
  })

  let changeFocus = (index) => {
    setFocused(index);
    // refs.current[index].current.focus();
  }

  function handleSaveDay() {
    setIsLoading(true);
    let newDay = {}
    for (let [index, metric] of user.info.metrics.entries()) {
      newDay[metric.id] = refs.current[index].current.value;
      if (metric.type === 'rating')
        newDay[metric.id] = parseInt(newDay[metric.id]);
      if (newDay[metric.id] === -1 || newDay[metric.id] === '')
        newDay[metric.id] = null;
    }
    let date = (new Date(refDate.current.value)).toISOString().slice(0, 10);
    user.saveDay(date, newDay, handleSaveDaySuccess, handleSaveDayError);
  }

  function handleSaveDaySuccess() {
    showAlert('Day saved', 'success');
    setIsLoading(false);
  }

  function handleSaveDayError(error) {
    showAlert(error.message, 'error');
    setIsLoading(false);
  }

  let classes = useStyles();
  return user.info.metrics.map((metric, index) => {
    if (metric.type === 'rating')
      return (
        <animated.div {...bind()} key={index} className={classes.root} style={{ display: props[index].display, left: props[index].x }}>
          <DayRatingField
            metric={metric}
            reference={refs.current[index]}
            index={index}
            onFocus={changeFocus}
            isFocused={focused === index}
          />
        </animated.div>);
    else if (metric.type === 'text')
      return (
        <animated.div {...bind()} key={index} className={classes.root} style={{ display: props[index].display, left: props[index].x }}>
          <DayTextField
            metric={metric}
            reference={refs.current[index]}
            index={index}
            onFocus={changeFocus}
            isFocused={focused === index}
          />
        </animated.div>);
  })
}

let useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    width: '100%',
    padding: 'inherit',
    userSelect: 'none',
  }
}));

export default AddDayForm;
