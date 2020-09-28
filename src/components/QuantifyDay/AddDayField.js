import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Rating from '@material-ui/lab/Rating';
import Radio from '@material-ui/core/Radio';
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked'
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
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
    }
  }, [reference, isFocused]);

  let classes = useStyles();
  return (
    <Paper className={classes.root} elevation={8} >
      <Hidden mdDown>
        <IconButton aria-label="previous" color="primary" onClick={() => changeFocus(index - 1)}>
          <NavigateBeforeIcon classes={{ root: classes.arrow }} />
        </IconButton>
      </Hidden>
      <div className={classes.layout}>
        <Typography variant="h3" className={classes.title}>{metric.name}</Typography>
        <TextField
          inputRef={reference}
          InputProps={{ inputProps: { tabIndex: -1 } }}
          value={value}
          label={metric.name}
          onFocus={() => changeFocus(index)}
          onChange={(e) => setValue(e.target.value)}
          fullWidth={true}
          multiline
        />
        <Typography variant='body1' className={classes.description}>{metric.description}</Typography>
      </div>
      <Hidden mdDown>
        <IconButton aria-label="next" color="primary" onClick={() => changeFocus(index + 1)}>
          <NavigateNextIcon classes={{ root: classes.arrow }} />
        </IconButton>
      </Hidden>
    </Paper>
  );
}

function DayNumberField({ metric, reference, index, isFocused, changeFocus }) {
  let [value, setValue] = useState('');

  useEffect(() => {
    if (isFocused) {
      reference.current.focus({ preventScroll: true });
    }
  }, [reference, isFocused]);

  let classes = useStyles();
  return (
    <Paper className={classes.root} elevation={8} >
      <Hidden mdDown>
        <IconButton aria-label="previous" color="primary" onClick={() => changeFocus(index - 1)}>
          <NavigateBeforeIcon classes={{ root: classes.arrow }} />
        </IconButton>
      </Hidden>
      <div className={classes.layout}>
        <Typography variant="h3" className={classes.title}>{metric.name}</Typography>
        <div className={classes.horizontalFlex}>
          <Input
            inputRef={reference}
            value={value}
            margin="dense"
            onChange={(e) => setValue(Number(e.target.value))}
            inputProps={{
              step: 1,
              type: 'number',
              'aria-labelledby': 'range-slider',
            }}
            style={{ width: 62, margin: '2rem' }}
          />
          <Slider
            min={metric.range[0]}
            max={metric.range[1]}
            value={Number(value)}
            onChange={(_, newValue) => setValue(newValue)}
            valueLabelDisplay="auto"
            aria-labelledby="slider"
          />
        </div>
        <Typography variant='body1' className={classes.description}>{metric.description}</Typography>
      </div>
      <Hidden mdDown>
        <IconButton aria-label="next" color="primary" onClick={() => changeFocus(index + 1)}>
          <NavigateNextIcon classes={{ root: classes.arrow }} />
        </IconButton>
      </Hidden>
    </Paper>
  );
}

function DayRatingField({ metric, reference, index, isFocused, changeFocus }) {
  let [value, setValue] = useState(-1);
  let refZero = useRef(React.createRef());

  useEffect(() => {
    if (isFocused) {
      refZero.current.focus({ preventScroll: true });
    }
  }, [refZero, isFocused]);

  let classes = useStyles();
  let mapRatingClass = { 1: classes.rating1, 2: classes.rating2, 3: classes.rating3, 4: classes.rating4, 5: classes.rating5, 6: classes.rating6, 7: classes.rating7, 8: classes.rating8, 9: classes.rating9, 10: classes.rating10, 11: classes.rating11 }
  return (
    <Paper className={classes.root} elevation={8} >
      <Hidden mdDown>
        <IconButton aria-label="previous" color="primary" onClick={() => changeFocus(index - 1)}>
          <NavigateBeforeIcon classes={{ root: classes.arrow }} />
        </IconButton>
      </Hidden>
      <div className={classes.layout}>
        <Typography variant="h3" className={classes.title}>{metric.name}</Typography>
        <input value={value} ref={reference} type="hidden" />
        <div className={classes.rating}>
          <Radio
            inputRef={refZero}
            classes={{ root: mapRatingClass[metric.details.length] }}
            name={'rating' + metric.id}
            checked={value === 0}
            value={0}
            onChange={() => { setValue(0); changeFocus(index + 1); }}
            icon={<RadioButtonUnchecked />}
            checkedIcon={<RadioButtonChecked />} />
          <Rating
            classes={{ sizeLarge: mapRatingClass[metric.details.length] }}
            name={'rating' + metric.id}
            value={value}
            onChange={(e, newValue) => { setValue(newValue); changeFocus(index + 1); }}
            max={metric.details.length - 1}
            size="large"
          />
        </div>
        <Typography variant='body1' className={classes.description}>{metric.description}</Typography>
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
      </div>
      <Hidden mdDown>
        <IconButton aria-label="next" color="primary" onClick={() => changeFocus(index + 1)}>
          <NavigateNextIcon classes={{ root: classes.arrow }} />
        </IconButton>
      </Hidden>
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

  useEffect(() => {
    if (isFocused)
      reference.current.focus({ preventScroll: true });
  }, [reference, isFocused]);

  let classes = useStyles();
  return (
    <Paper className={classes.root} elevation={8} >
      <Hidden mdDown>
        <IconButton aria-label="previous" color="primary" onClick={() => changeFocus(index - 1)} style={{ visibility: 'hidden' }}>
          <NavigateBeforeIcon classes={{ root: classes.arrow }} />
        </IconButton>
      </Hidden>
      <div className={classes.layout}>
        <Typography variant="h3" className={classes.title}>Date</Typography>
        <input value={value} ref={reference} type="hidden" />
        <div style={{ width: 'min-content' }}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              autoOk
              disableFuture
              label="Date"
              onChange={(input) => setValue(input)}
              onAccept={() => changeFocus(index + 1)}
              // onFocus={() => changeFocus(index)}
              format="yyyy/MM/dd"
              autoFocus={true}
              value={value}
              disableToolbar
              variant="static"
            />
          </MuiPickersUtilsProvider>
        </div>
        <Typography variant='body1' className={classes.description}>Date of the day</Typography>
      </div>
      <Hidden mdDown>
        <IconButton aria-label="next" color="primary" onClick={() => changeFocus(index + 1)} >
          <NavigateNextIcon classes={{ root: classes.arrow }} />
        </IconButton>
      </Hidden>
    </Paper>
  );
}


function DaySubmit({ index, isFocused, changeFocus, onSubmit, isLoading }) {
  let reference = useRef(React.createRef());

  useEffect(() => {
    if (isFocused)
      reference.current.focus({ preventScroll: true });
  }, [reference, isFocused]);

  let classes = useStyles();
  return (
    <Paper className={classes.root} elevation={8} >
      <Hidden mdDown>
        <IconButton aria-label="previous" color="primary" onClick={() => changeFocus(index - 1)}>
          <NavigateBeforeIcon classes={{ root: classes.arrow }} />
        </IconButton>
      </Hidden>
      <div className={classes.layout}>
        <Typography variant="h3" className={classes.title}>Submit</Typography>
        <div className={classes.buttonWrapper}>
          <Button className={classes.button}
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
      </div>
      <Hidden mdDown>
        <IconButton aria-label="next" color="primary" onClick={() => changeFocus(index + 1)} style={{ visibility: 'hidden' }}>
          <NavigateNextIcon classes={{ root: classes.arrow }} />
        </IconButton>
      </Hidden>
    </Paper>
  );
}

let useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    position: 'relative',
    width: '100%',
    paddingTop: '3%',
    paddingBottom: '3%',
    margin: '0',
    borderRadius: '1em',
    // boxShadow: '0 0 4rem 0 blue',
  },
  layout: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    width: '100%',
    paddingLeft: '6%',
    paddingRight: '6%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexCenter: {
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rating: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    height: '5rem',
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  description: {
    paddingTop: '2rem',
    paddingBottom: '2rem',
  },
  rating1: { fontSize: '4rem', height: '4rem', width: '4rem' },
  rating2: { fontSize: '4rem', height: '4rem', width: '4rem' },
  rating3: { fontSize: '4rem', height: '4rem', width: '4rem' },
  rating4: { fontSize: '4rem', height: '4rem', width: '4rem' },
  rating5: { fontSize: 'min(4rem, (70/5)vw)' },
  rating6: { fontSize: 'min(4rem, 13vw)' },
  rating7: { fontSize: 'min(4rem, 11vw)' },
  rating8: { fontSize: 'min(4rem, 10vw)' },
  rating9: { fontSize: 'min(4rem, 8vw)' },
  rating10: { fontSize: 'min(4rem, 7vw)' },
  rating11: { fontSize: 'min(4rem, 6vw)' },

  arrow: {
    fontSize: '5rem',
  },


  buttonWrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  button: {
    padding: '2rem',
    borderRadius: '1em',
    fontSize: '4rem',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));


export { DayTextField, DayRatingField, DayNumberField, DayDateField, DaySubmit };