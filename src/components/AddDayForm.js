import React, { useState, useContext, useRef } from 'react';
import UserContext from '../components/Firebase';
import AlertContext from '../components/Header';
import { DayTextField, DayRatingField, DayDateField, DaySubmit } from './AddDayField';

function AddDayForm() {
  let user = useContext(UserContext);
  let showAlert = useContext(AlertContext);
  let refs = useRef(user.info.metrics.map(() => React.createRef()));
  let refDate = useRef(React.createRef());
  let [focused, setFocused] = useState(-1);
  let [isLoading, setIsLoading] = useState(false);

  let changeFocus = (index) => {
    setFocused(index);
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

  let fields = [];
  for (let [index, metric] of user.info.metrics.entries()) {
    if (metric.type === 'rating') {
      fields.push(<DayRatingField
        key={metric.id}
        metric={metric}
        reference={refs.current[index]}
        index={index}
        isFocused={focused === index}
        onFocus={changeFocus}
      />);
    }
    else if (metric.type === 'text') {
      fields.push(<DayTextField
        key={metric.id}
        metric={metric}
        reference={refs.current[index]}
        index={index}
        isFocused={focused === index}
        onFocus={changeFocus}
      />);
    }
  }
  return <>
    <DayDateField
      key={'date'}
      reference={refDate}
      index={-1}
      isFocused={focused === -1}
      onFocus={changeFocus}
    />
    {fields}
    <DaySubmit key='submitButton'
      index={user.info.metrics.length}
      onFocus={changeFocus}
      isFocused={focused === user.info.metrics.length}
      onSubmit={handleSaveDay}
      isLoading={isLoading} />
  </>;
}

export default AddDayForm