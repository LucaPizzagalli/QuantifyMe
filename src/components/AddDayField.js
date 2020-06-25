import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
import Zoom from '@material-ui/core/Zoom';






function DayTextField({ metric, reference, index, isFocused, onFocus }) {
  useEffect(() => {
    if (isFocused)
      reference.current.focus();
  }, [reference, isFocused]);

  let classes = useStyles();

  return (
    <div className={classes.root}>
      <Zoom in={!isFocused}>
        <Paper variant="outlined" className={classes.blurredPaper} onClick={() => { onFocus(index); }} >
          <Typography>{metric.name}</Typography>
          <TextField
            inputRef={reference}
            label={metric.name}
            onFocus={() => { onFocus(index); }}
            fullWidth={true}
            multiline
          />
        </Paper>
      </Zoom>
      <div className={classes.overlapped}>
        <Zoom in={isFocused}>
          <Paper className={classes.focusedPaper} elevation={8} >
            <Typography>{metric.name}</Typography>
            <TextField
              inputRef={reference}
              label={metric.name}
              onFocus={() => { onFocus(index); }}
              fullWidth={true}
              multiline
            />
            <Typography variant='body1'>{metric.description}</Typography>
          </Paper>
        </Zoom>
      </div>
    </div>
  );
}


function DayRatingField({ metric, reference, index, isFocused, onFocus }) {
  let [value, setValue] = useState(-1)
  let refZero = useRef(React.createRef());

  useEffect(() => {
    if (isFocused)
      refZero.current.focus();
  }, [isFocused]);

  let classes = useStyles();
  return (
    <div className={classes.root}>
      <Zoom in={!isFocused}>
        <Paper variant="outlined" className={classes.blurredPaper} onClick={() => onFocus(index)} >
          <Typography>{metric.name}</Typography>
          <input value={value} ref={reference} type="hidden" />
          <div>
            <Radio
              inputRef={refZero}
              name={'rating' + metric.id}
              checked={value === 0}
              value={0}
              onChange={() => { setValue(0); onFocus(index + 1); }}
              onFocus={() => { onFocus(index); }}
              icon={<RadioButtonUnchecked />}
              checkedIcon={<RadioButtonChecked />} />
            <Rating
              name={'rating' + metric.id}
              value={value}
              onChange={(e, newValue) => { setValue(newValue); onFocus(index + 1); }}
              max={metric.details.length - 1}
              onFocus={() => onFocus(index)} />
          </div>
        </Paper>
      </Zoom>

      <div className={classes.overlapped}>
        <Zoom unmountOnExit in={isFocused}>
          <Paper className={classes.focusedPaper} elevation={8} >
            <Typography>{metric.name}</Typography>
            <input value={value} ref={reference} type="hidden" />
            <div className={classes.flexCenter}>
              <Radio
                inputRef={refZero}
                name={'rating' + metric.id}
                checked={value === 0}
                value={0}
                onChange={() => { setValue(0); onFocus(index + 1); }}
                onFocus={() => { onFocus(index); }}
                icon={<RadioButtonUnchecked />}
                checkedIcon={<RadioButtonChecked />} />
              <Rating //className={classes.rating}
              classes={{
                // icon: classes.rating, // class name, e.g. `classes-nesting-root-x`
                sizeLarge: classes.rating, // class name, e.g. `classes-nesting-label-x`
              }}
                name={'rating' + metric.id}
                value={value}
                onChange={(e, newValue) => { setValue(newValue); onFocus(index + 1); }}
                max={metric.details.length - 1}
                onFocus={() => onFocus(index)}
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
        </Zoom>
      </div>
    </div >
  );
}


function DayDateField({ reference, index, isFocused, onFocus }) {
  let [value, setValue] = useState(new Date());

  let classes = useStyles();

  return (
    <div className={classes.root}>
      <Zoom in={!isFocused}>
        <Paper className={classes.blurredPaper} onClick={() => { onFocus(index); }} >
          <Typography>Date</Typography>
          <input value={value.toISOString().slice(0, 10)} ref={reference} type="hidden" />
          <MuiPickersUtilsProvider utils={DateFnsUtils} >
            <DatePicker
              autoOk
              disableFuture
              label="Date"
              onChange={(input) => setValue(input)}
              onAccept={() => onFocus(index + 1)}
              onFocus={() => onFocus(index)}
              format='yyyy/MM/dd'
              autoFocus={true}
              value={value}
              fullWidth={true}
            />
          </MuiPickersUtilsProvider>
        </Paper>
      </Zoom>

      <div className={classes.overlapped}>
        <Zoom unmountOnExit in={isFocused}>
          <Paper className={classes.focusedPaper} elevation={8} >
            <Typography>Date</Typography>
            <input value={value} ref={reference} type="hidden" />
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
              <DatePicker
                autoOk
                disableFuture
                label="Date"
                onChange={(input) => setValue(input)}
                onAccept={() => onFocus(index + 1)}
                onFocus={() => onFocus(index)}
                format='yyyy/MM/dd'
                autoFocus={true}
                value={value}
                fullWidth={true}
              />
            </MuiPickersUtilsProvider>
            <Typography variant='body1'>Ciao ciao</Typography>
          </Paper>
        </Zoom>
      </div>
    </div>
  );
}


function DaySubmit({ index, isFocused, onFocus, onSubmit, isLoading }) {
  let reference = useRef(React.createRef());

  useEffect(() => {
    if (isFocused)
      reference.current.focus();
  }, [isFocused]);

  let classes = useStyles();
  if (isFocused)
    return (
      <Paper className={classes.focusedPaper} elevation={8} >
        <div className={classes.buttonWrapper}>
          <Button
            ref={reference}
            variant="contained"
            color="primary"
            onFocus={() => { onFocus(index); }}
            disabled={isLoading}
            onClick={onSubmit}
          >
            Save day
        </Button>
          {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
        <Typography variant='body1'>{'Only some text for now'}</Typography>
      </Paper>
    );
  else
    return (
      <Paper className={classes.blurredPaper} onClick={() => { onFocus(index); }} >
        <div className={classes.buttonWrapper}>
          <Button
            ref={reference}
            variant="contained"
            color="primary"
            onFocus={() => onFocus(index)}
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
  },
  flexCenter: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
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

  // flexLeft: {
  //   display: 'flex',
  //   flexWrap: 'wrap',
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  // },
  // smallColumn: {
  //   flexBasis: '25%',
  // },
  // fullColumn: {
  //   flexBasis: '100%',
  // },
  // textFocused: {
  //   fontSize: '6em',
  //   transition: theme.transitions.create(['all'], {})
  // },
  // textBlurred: {
  //   transition: theme.transitions.create(['all'], {})
  // },
  // inputFocused: {
  //   fontSize: '3em',
  //   // transition: theme.transitions.create(['all'], {})
  // },
  // inputBlurred: {
  //   // transition: theme.transitions.create(['all'], {})
  // },
  // ratingFocused: {
  //   fontSize: 100,
  //   transition: theme.transitions.create(['all'], {})
  // },
  // ratingBlurred: {
  //   transition: theme.transitions.create(['all'], {})
  // },
  // zeroRatingFocused: {
  //   width: 150,
  //   height: 150,
  //   fontSize: 100,
  //   transition: theme.transitions.create(['all'], {})
  // },
  // zeroRatingBlurred: {
  //   transition: theme.transitions.create(['all'], {})
  // },
  // buttonFocused: {
  //   margin: '3rem -6rem 3rem -6rem',
  //   boxShadow: '0 0 4rem 0 blue',
  //   flexBasis: '80%',
  //   fontSize: '6em',
  //   padding: '0em 1em 0em 1em',
  //   borderRadius: '0.2em',
  //   transition: theme.transitions.create(['all'], {})
  // },
  // buttonBlurred: {
  //   transition: theme.transitions.create(['all'], {})
  // },
  // descriptionFull: {
  //   padding: '0em 2em 2em 5em',
  // }

// class DayTextFieldPure extends React.Component {
//   constructor(props) {
//     super(props);
//     this.inputRef = React.createRef();
//   }

//   shouldComponentUpdate(nextProps, nextState) {
//     if (nextProps.isFocused === this.props.isFocused && nextProps.value === this.props.value)
//       return false;
//     return true;
//   }

//   componentDidUpdate(prevProps) {
//     if (prevProps.isFocused !== this.props.isFocused) {
//       if (this.props.isFocused)
//         this.inputRef.current.focus();
//     }
//   }

//   render() {
//     let classes = this.props.classes;
//     let isFocused = this.props.isFocused;
//     let key = this.props.this_key;
//     return (
//       <div className={isFocused ? classes.paperFocused : classes.paperBlurred}
//         onClick={_ => { this.props.onFocus(key); }} >
//         <Collapse in={isFocused} timeout='auto' className={classes.fullColumn}>
//           <Typography className={classes.textFocused}> {this.props.label} </Typography>
//         </Collapse>
//         <TextField
//           InputProps={{ className: (isFocused ? classes.inputFocused : classes.inputBlurred) }}
//           label={this.props.label}
//           inputRef={this.inputRef}
//           value={this.props.value}
//           onChange={(input) => { this.props.onInput(key, input.target.value); }}
//           onFocus={(_) => { this.props.onFocus(key); }}
//           fullWidth={true}
//           multiline
//         />
//         <Collapse in={isFocused} timeout='auto'>
//           <Typography variant='body1' className={classes.descriptionFull}>{this.props.description}</Typography>
//         </Collapse>
//       </div>
//     );
//   }
// }

// class DayRatingFieldPure extends React.Component {
//   constructor(props) {
//     super(props);
//     this.inputRef = React.createRef();
//   }

//   shouldComponentUpdate(nextProps, nextState) {
//     if (nextProps.isFocused === this.props.isFocused && nextProps.valueRating === this.props.valueRating)
//       return false;
//     return true;
//   }

//   componentDidUpdate(prevProps) {
//     if (prevProps.isFocused !== this.props.isFocused) {
//       if (this.props.isFocused) {
//         this.inputRef.current.focus(); //// Not working, who knows why
//       }
//     }
//   }

//   render() {
//     let classes = this.props.classes;
//     let isFocused = this.props.isFocused;
//     let key = this.props.this_key;
//     let explanation = [];
//     let index = 0;
//     for (let element of this.props.descriptionRating) {
//       explanation.push(
//         <TableRow key={index}>
//           <TableCell component='th' scope='row'>{index}</TableCell>
//           <TableCell >{element}</TableCell>
//         </TableRow>);
//       index++;
//     }
//     return (
//       <div className={isFocused ? classes.paperFocused : classes.paperBlurred}
//         onClick={_ => { this.props.onFocus(key); }} >
//         <div className={isFocused ? classes.flexCenter : classes.flexLeft}>
//           <Typography className={isFocused ? clsx(classes.fullColumn, classes.textFocused) : clsx(classes.smallColumn, classes.textBlurred)} >
//             {this.props.label}
//           </Typography>
//           <div className={classes.flexCenter}>
//             <Radio inputRef={this.inputRef} name={'rating' + key}
//               className={isFocused ? classes.zeroRatingFocused : classes.zeroRatingBlurred}
//               checked={this.props.valueRating === 0}
//               value={this.props.valueRating}
//               onChange={_ => {
//                 this.props.onInput(key, 0);
//                 this.props.onFocus(key);
//               }}
//               onFocus={_ => { this.props.onFocus(key); }}
//               icon={<RadioButtonUnchecked className={isFocused ? classes.ratingFocused : classes.ratingBlurred} />}
//               checkedIcon={<RadioButtonChecked className={isFocused ? classes.ratingFocused : classes.ratingBlurred} />} />
//             <Rating max={this.props.descriptionRating.length - 1}
//               className={isFocused ? classes.ratingFocused : classes.ratingBlurred}
//               name={'rating' + key}
//               value={this.props.valueRating}
//               onChange={(_, rating) => {
//                 this.props.onInput(key, rating);
//                 this.props.onFocus(this.props.next_key);
//               }}
//               onFocus={(_) => { this.props.onFocus(key); }}
//             />
//           </div>
//         </div>

//         <Collapse in={isFocused} timeout='auto'>
//           <div className={classes.descriptionFull}>
//             <Table aria-label='explanation-table'>
//               <TableBody>{explanation}</TableBody>
//             </Table>
//           </div>
//         </Collapse>
//       </div>
//     );
//   }
// }

// class DayDateFieldPure extends React.Component {
//   shouldComponentUpdate(nextProps, nextState) {
//     if (nextProps.isFocused === this.props.isFocused && nextProps.value === this.props.value)
//       return false;
//     return true;
//   }
//   componentDidUpdate(prevProps) {
//     if (prevProps.isFocused !== this.props.isFocused) {
//       if (this.props.isFocused)
//         this.inputRef.current.focus();
//     }
//   }
//   render() {
//     let classes = this.props.classes;
//     let isFocused = this.props.isFocused;
//     let key = this.props.this_key;
//     return (
//       <div className={isFocused ? classes.paperFocused : classes.paperBlurred} >
//         <Collapse in={isFocused} timeout='auto' className={classes.fullColumn}>
//           <Typography className={classes.textFocused}> {this.props.label} </Typography>
//         </Collapse>
//         {/* <MuiPickersUtilsProvider utils={DateFnsUtils} >
//           <DatePicker
//             autoOk
//             disableFuture
//             label={this.props.label}
//             onChange={(input) => { this.props.onInput(key, input); }}
//             onAccept={(_) => { this.props.onFocus(this.props.next_key); }}
//             format='yyyy/MM/dd'
//             autoFocus={true}
//             value={this.props.value}
//             fullWidth={true}
//           />
//         </MuiPickersUtilsProvider> */}
//       </div>
//     );
//   }
// }

// class DaySubmitPure extends React.Component {
//   constructor(props) {
//     super(props);
//     this.ref = React.createRef();
//   }

//   shouldComponentUpdate(nextProps, nextState) {
//     if (nextProps.isFocused === this.props.isFocused)
//       return false;
//     return true;
//   }

//   componentDidUpdate(prevProps) {
//     if (prevProps.isFocused !== this.props.isFocused) {
//       if (this.props.isFocused)
//         this.ref.current.focus();
//     }
//   }

//   render() {
//     let classes = this.props.classes;
//     let isFocused = this.props.isFocused;
//     return (
//       <div className={classes.flexCenter} >
//         <div className={clsx(classes.fullColumn, classes.flexCenter)}>
//           <Button variant='contained' color='primary' ref={this.ref}
//             className={isFocused ? classes.buttonFocused : classes.buttonBlurred}
//             onFocus={(_) => { this.props.onFocus('submitButton'); }}
//             onClick={this.props.onClick} >
//             submit
//           </Button>
//         </div>
//         <Collapse in={isFocused} timeout='auto'>
//           <Typography variant='body1' className={classes.descriptionFull}>{'solo del testo per adesso'}</Typography>
//         </Collapse>
//       </div>
//     );
//   }
// }










// let DayTextField = withStyles(styles)(DayTextFieldPure);
// let DayRatingField = withStyles(styles)(DayRatingFieldPure);
// let DayDateField = withStyles(styles)(DayDateFieldPure);
// let DaySubmit = withStyles(styles)(DaySubmitPure);

export { DayTextField, DayRatingField, DayDateField, DaySubmit };