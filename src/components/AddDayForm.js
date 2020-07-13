import React, { useState, useContext, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import Container from '@material-ui/core/Container';
import UserContext from './Firebase';
import AlertContext from './Layout';
import { DayTextField, DayRatingField, DayDateField, DaySubmit } from './AddDayField';

function AddDayForm() {
  let user = useContext(UserContext);
  let showAlert = useContext(AlertContext);
  let refs = useRef(user.info.metrics.map(() => React.createRef()));
  let refDate = useRef(React.createRef());
  let [focused, setFocused] = useState(-1);
  let [isLoading, setIsLoading] = useState(false);

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
      newDay[metric.id] = refs.current[index].current.value;
      if (metric.type === 'rating')
        newDay[metric.id] = parseInt(newDay[metric.id]);
      if (newDay[metric.id] === -1 || newDay[metric.id] === '')
        newDay[metric.id] = null;
    }
    let date = (new Date(refDate.current.value)).toISOString().slice(0, 10);
    console.log(date)
    console.log(newDay)
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
  return (
    <animated.div {...bind()} className={classes.cardList} style={{ left: x }}>
      <div key={'date'} className={classes.cardDiv} >
        {focused <= 1 &&
          <Container fixed display="flex">
            <DayDateField
              reference={refDate}
              index={-1}
              isFocused={focused === -1}
              changeFocus={changeFocus}
            />
          </Container >
        }
      </div>
      {user.info.metrics.map((metric, index) => {
        if (metric.type === 'rating')
          return (
            <div key={index} className={classes.cardDiv} >
              {focused >= index - 1 && focused <= index + 1 &&
                <Container fixed display="flex">
                  <DayRatingField
                    metric={metric}
                    reference={refs.current[index]}
                    index={index}
                    changeFocus={changeFocus}
                    isFocused={focused === index}
                  />
                </Container >
              }
            </div>);
        else if (metric.type === 'text')
          return (
            <div key={index} className={classes.cardDiv} >
              {focused >= index - 1 && focused <= index + 1 &&
                <Container fixed display="flex">
                  <DayTextField
                    metric={metric}
                    reference={refs.current[index]}
                    index={index}
                    changeFocus={changeFocus}
                    isFocused={focused === index}
                  />
                </Container >
              }
            </div>);
        return null;
      })}
      <div key={'submit'} className={classes.cardDiv} >
        {focused >= user.info.metrics.length - 1 &&
          < Container fixed display="flex">
          <DaySubmit
          index={user.info.metrics.length}
          changeFocus={changeFocus}
          isFocused={focused === user.info.metrics.length}
          onSubmit={handleSaveDay}
          isLoading={isLoading} />
        </Container >
        }
      </div>
    </animated.div >
  );
}

let useStyles = makeStyles((theme) => ({
  cardList: {
    position: 'absolute',
    display: 'flex',
    userSelect: 'none',
    marginTop: '1rem'
  },
  cardDiv: {
    display: 'flex',
    width: '100vw',
  },
}));

export default AddDayForm;
