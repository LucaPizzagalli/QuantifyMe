import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Rating from '@material-ui/lab/Rating';
import Radio from '@material-ui/core/Radio';
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';

function DayTextField({ metric, reference, index, isFocused, changeFocus }) {
  let [value, setValue] = useState('');

  useEffect(() => {
    if (isFocused) {
      reference.current.focus({ preventScroll: true });
      console.log('FOCUUUUUUS')
    }
  }, [reference, isFocused]);

  let classes = useStyles();
  return (
    <Paper className={classes.root} elevation={8} >
      <div className={classes.flexCenter}>
        <IconButton aria-label="previous" color="primary" onClick={() => changeFocus(index - 1)}><NavigateBeforeIcon /></IconButton>
        <Typography variant="h3" className={classes.title}>{metric.name}</Typography>
        <IconButton aria-label="next" color="primary" onClick={() => changeFocus(index + 1)}><NavigateNextIcon /></IconButton>
      </div>
      <TextField
        inputRef={reference}
        InputProps={{ inputProps: { tabIndex: -1 } }}
        value={value}
        label={metric.name}
        onFocus={(e) => { changeFocus(index); }}
        onChange={(e) => { setValue(e.target.value); changeFocus(index + 1); }}
        fullWidth={true}
        multiline
      />
      <Typography variant='body1'>{metric.description}</Typography>
    </Paper>
  );
}

function DayRatingField({ metric, reference, index, isFocused, changeFocus }) {
  let [value, setValue] = useState(-1);
  let refZero = useRef(React.createRef());

  useEffect(() => {
    if (isFocused) {
      refZero.current.focus({ preventScroll: true });
      console.log('FOCUUUUUUS')
    }
  }, [refZero, isFocused]);

  let classes = useStyles();
  return (
    <Paper className={classes.root} elevation={8} >
      <div className={classes.flexCenter}>
        <IconButton aria-label="previous" color="primary" onClick={() => changeFocus(index - 1)}><NavigateBeforeIcon /></IconButton>
        <Typography variant="h3" className={classes.title}>{metric.name}</Typography>
        <IconButton aria-label="next" color="primary" onClick={() => changeFocus(index + 1)}><NavigateNextIcon /></IconButton>
      </div>
      <input value={value} ref={reference} type="hidden" />
      <div className={classes.flexCenter}>
        <Radio
          inputRef={refZero}
          name={'rating' + metric.id}
          checked={value === 0}
          value={0}
          onChange={() => { setValue(0); changeFocus(index + 1); }}
          icon={<RadioButtonUnchecked />}
          checkedIcon={<RadioButtonChecked />} />
        <Rating
          classes={{ sizeLarge: classes.rating }}
          name={'rating' + metric.id}
          value={value}
          onChange={(e, newValue) => { setValue(newValue); changeFocus(index + 1); }}
          max={metric.details.length - 1}
          size="large"
        />
      </div>
      <Typography variant='body1'>{metric.description}</Typography>
      <Table aria-label='details-table'>
        <TableBody>
          {metric.details.map((detail, index) =>
            <TableRow key={index}>
              <TableCell component='th' scope='row'>{index}</TableCell>
              <TableCell >{detail}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}

// function DayRatingField({ metric, reference, index, isFocused, onFocus }) {
//   let [value, setValue] = useState(-1);
//   let refZero = useRef(React.createRef());

//   useEffect(() => {
//     if (isFocused)
//       refZero.current.focus();
//   }, [isFocused]);

//   let classes = useStyles();
//   return (
//     <div className={classes.root}>
//       <input value={value} ref={reference} type="hidden" />
//       <Zoom in={!isFocused}>
//         <Paper variant="outlined" className={classes.blurredPaper} onClick={() => onFocus(index)} >
//           <Typography>{metric.name}</Typography>
//           <div>
//             <Radio
//               name={'rating' + metric.id}
//               checked={value === 0}
//               value={0}
//               onChange={() => { setValue(0); onFocus(index + 1); }}
//               onFocus={() => { onFocus(index); }}
//               icon={<RadioButtonUnchecked />}
//               checkedIcon={<RadioButtonChecked />} />
//             <Rating
//               name={'rating' + metric.id}
//               value={value}
//               onChange={(e, newValue) => { setValue(newValue); onFocus(index + 1); }}
//               max={metric.details.length - 1}
//               onFocus={() => onFocus(index)} />
//           </div>
//         </Paper>
//       </Zoom>

//       <div className={classes.overlapped}>
//         <Zoom unmountOnExit in={isFocused}>
//           <Paper className={classes.focusedPaper} elevation={8} >
//             <Typography variant="h3">{metric.name}</Typography>
//             <div className={classes.flexCenter}>
//               <Radio
//                 inputRef={refZero}
//                 name={'rating' + metric.id}
//                 checked={value === 0}
//                 value={0}
//                 onChange={() => { setValue(0); onFocus(index + 1); }}
//                 icon={<RadioButtonUnchecked />}
//                 checkedIcon={<RadioButtonChecked />} />
//               <Rating
//                 classes={{ sizeLarge: classes.rating }}
//                 name={'rating' + metric.id}
//                 value={value}
//                 onChange={(e, newValue) => { setValue(newValue); onFocus(index + 1); }}
//                 max={metric.details.length - 1}
//                 size="large"
//               />
//             </div>
//             <Typography variant='body1'>{metric.description}</Typography>
//             <Table aria-label='details-table'>
//               <TableBody>
//                 {metric.details.map((detail, index) =>
//                   <TableRow key={index}>
//                     <TableCell component='th' scope='row'>{index}</TableCell>
//                     <TableCell >{detail}</TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </Paper>
//         </Zoom>
//       </div>
//     </div >
//   );
// }


function DayDateField({ reference, index, isFocused, changeFocus }) {
  let [value, setValue] = useState(new Date());

  let classes = useStyles();
  return (
    <Paper className={classes.root} elevation={8} >
      <div className={classes.flexCenter}>
        <IconButton aria-label="previous" disabled color="primary" onClick={() => changeFocus(index - 1)}><NavigateBeforeIcon /></IconButton>
        <Typography variant="h3" className={classes.title}>Date</Typography>
        <IconButton aria-label="next" color="primary" onClick={() => changeFocus(index + 1)}><NavigateNextIcon /></IconButton>
      </div>
      <input value={value} ref={reference} type="hidden" />
      <MuiPickersUtilsProvider utils={DateFnsUtils} >
        <DatePicker
          autoOk
          disableFuture
          label="Date"
          onChange={(input) => setValue(input)}
          onAccept={() => changeFocus(index + 1)}
          onFocus={() => changeFocus(index)}
          format='yyyy/MM/dd'
          autoFocus={true}
          value={value}
          fullWidth={true}
        />
      </MuiPickersUtilsProvider>
      <Typography variant='body1'>Date of the day</Typography>
    </Paper>
  );
}


function DaySubmit({ index, isFocused, changeFocus, onSubmit, isLoading }) {
  let reference = useRef(React.createRef());

  useEffect(() => {
    if (isFocused)
      reference.current.focus();
  }, [isFocused]);

  let classes = useStyles();
  return (
    <Paper className={classes.root} elevation={8} >
      <div className={classes.flexCenter}>
        <IconButton aria-label="previous" color="primary" onClick={() => changeFocus(index - 1)}><NavigateBeforeIcon /></IconButton>
        <Typography variant="h3" className={classes.title}>Submit</Typography>
        <IconButton aria-label="next" disabled color="primary" onClick={() => changeFocus(index + 1)}><NavigateNextIcon /></IconButton>
      </div>
      <div className={classes.buttonWrapper}>
        <Button
          ref={reference}
          variant="contained"
          color="primary"
          onFocus={() => { changeFocus(index); }}
          disabled={isLoading}
          onClick={onSubmit}
        >
          Save day
        </Button>
        {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
    </Paper>
  );
}

let useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: '100%',
    padding: '4rem 4rem',
    margin: '0',
    borderRadius: '1em',
    // boxShadow: '0 0 4rem 0 blue',
  },
  flexCenter: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
  focusedPaper: {
    position: 'relative',
    width: '100%',
    padding: '4rem 4rem',
    borderRadius: '1em',
    // boxShadow: '0 0 4rem 0 blue',
    zIndex: 1000,
  },
  blurredPaper: {
    padding: '1rem 2rem',
    margin: '1rem 1rem',
  },
  overlapped: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  rating: {
    fontSize: '4rem',
  },


  buttonWrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));


export { DayTextField, DayRatingField, DayDateField, DaySubmit };