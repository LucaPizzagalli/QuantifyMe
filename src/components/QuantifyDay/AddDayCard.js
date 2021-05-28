import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
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
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { logos } from '../CustomIcons'


function DayTextField({ metric, reference, index, isFocused, changeFocus }) {
  let [value, setValue] = useState('');

  useEffect(() => {
    if (isFocused) {
      reference.current.focus({ preventScroll: true });
    }
  }, [reference, isFocused]);

  let classes = useStyles({col: metric.color[0]});
  return (
    <Paper className={classes.root} elevation={8} >
      <div className={classes.layout}>
        <Typography variant="h3" align='center' className={classes.title}>{metric.name}</Typography>
        <TextField className={classes.textField}
          inputRef={reference}
          value={value}
          label={metric.name}
          onFocus={() => changeFocus(index)}
          onChange={(e) => setValue(e.target.value)}
          fullWidth={true}
          multiline
          InputProps={{ tabIndex: -1, classes: { underline: classes.underline } }}
          InputLabelProps={{ style: { color: metric.color[0] } }} />
        <div className={classes.description}>
          <div className={classes.logo}>
            {logos.get(metric.logo)({ color: metric.color })}
          </div>
          <Typography variant="body1" align="justify">{metric.description}</Typography>
        </div>
      </div>
    </Paper >
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
      <div className={classes.layout}>
        <Typography variant="h3" align='center' className={classes.title}>{metric.name}</Typography>
        <div className={classes.rating}>
          <Input
            inputRef={reference}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            inputProps={{
              step: 1,
              type: 'number',
              'aria-labelledby': 'range-slider',
            }}
            style={{ width: '6ch', margin: '2rem' }}
          />
          <Slider
            min={metric.range[0]}
            max={metric.range[1]}
            value={Number(value)}
            onChange={(_, newValue) => setValue(newValue)}
            valueLabelDisplay="auto"
            aria-labelledby="slider"
            style={{ color: metric.color[0] }} />
        </div>
        <div className={classes.description}>
          <div className={classes.logo}>
            {logos.get(metric.logo)({ color: metric.color })}
          </div>
          <Typography variant="body1" align="justify">{metric.description}</Typography>
        </div>
      </div>
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
      <div className={classes.layout}>
        <Typography variant="h3" align='center' className={classes.title}>{metric.name}</Typography>
        <input value={value} ref={reference} type="hidden" />
        <div className={classes.rating}>
          <Rating
            ref={refZero}
            classes={{ sizeLarge: mapRatingClass[metric.details.length] }}
            name={metric.id+'-0-rating'}
            emptyIcon={<FiberManualRecordIcon fontSize="inherit" />}
            icon={<FiberManualRecordIcon fontSize="inherit" />}
            onChange={() => { setValue(0); changeFocus(index + 1); }}
            max={1}
            size="large"
            style={{ color: metric.color[0] }} />
          <Rating
            classes={{ sizeLarge: mapRatingClass[metric.details.length] }}
            name={metric.id+'-rating'}
            value={value}
            onChange={(e, newValue) => { setValue(newValue); changeFocus(index + 1); }}
            max={metric.details.length - 1}
            size="large"
            style={{ color: metric.color[0] }} />
        </div>
        <div className={classes.description}>
          <div className={classes.logo}>
            {logos.get(metric.logo)({ color: metric.color })}
          </div>
          <Typography variant="body1" align="justify">{metric.description}</Typography>
        </div>
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
    </Paper>
  );
}


function DayDateField({ reference, index, date, setDate }) {

  let classes = useStyles();
  return (
    <Paper className={classes.root} elevation={8} >
      <div className={classes.layout}>
        <Typography variant="h3" align='center' className={classes.title}>Date</Typography>
        <div className={classes.rating}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              autoOk
              disableFuture
              label="Date"
              onChange={setDate}
              format="yyyy/MM/dd"
              autoFocus={true}
              value={date}
              // disableToolbar
              variant="static"
            />
          </MuiPickersUtilsProvider>
        </div>
        <Typography variant="body1" align="justify" className={classes.description}>Date of the day</Typography>
      </div>
    </Paper>
  );
}


function DaySubmit({ index, onSubmit, isLoading }) {

  let classes = useStyles();
  return (
    <Paper className={classes.root} elevation={8} >
      <div className={classes.layout}>
        <Typography variant="h3" align='center' className={classes.title}>Submit</Typography>
        <div className={classes.buttonWrapper}>
          <Button className={classes.button}
            variant="contained"
            color="primary"
            disabled={isLoading}
            onClick={onSubmit}
          >
            Save day
        </Button>
          {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
      </div>
    </Paper>
  );
}

function DayDone() {
  let classes = useStyles();
  return (
    <Paper className={classes.root} elevation={8} >
      <div className={classes.layout}>
        <Typography variant="h3" align='center' className={classes.title}>You Made It</Typography>
        <Typography variant="body1" className={classes.description}>Good job. Today is done.</Typography>
      </div>
    </Paper>
  );
}

function DayNoMetrics() {
  let classes = useStyles();
  return (
    <Paper className={classes.root} elevation={8} >
      <div className={classes.layout}>
        <Alert severity="info">
          <AlertTitle>There are no metrics yet</AlertTitle>
          Here you can log all the info you want about today, but first you need to create a metric! <br />
          Go <Link component={RouterLink} to="/metrics">here</Link> to create one.
        </Alert>
      </div>
    </Paper>
  );
}

let useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: '55rem',
    margin: '0',
    borderRadius: '1em',
    overflowX: 'hidden',
    overflowY: 'auto',
    // boxShadow: '0 0 4rem 0 blue',
  },
  layout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: '100%',
    padding: '6%',
  },
  rating: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  textField: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  logo: {
    float: 'left',
    width: '30%',
  },
  description: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  buttonWrapper: {
    position: 'relative',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  rating1: { fontSize: '4rem' },
  rating2: { fontSize: '4rem' },
  rating3: { fontSize: '4rem' },
  rating4: { fontSize: '4rem' },
  rating5: { fontSize: 'min(4rem, (70/5)vw)' },
  rating6: { fontSize: 'min(4rem, 13vw)' },
  rating7: { fontSize: 'min(4rem, 11vw)' },
  rating8: { fontSize: 'min(4rem, 10vw)' },
  rating9: { fontSize: 'min(4rem, 8vw)' },
  rating10: { fontSize: 'min(4rem, 7vw)' },
  rating11: { fontSize: 'min(4rem, 6vw)' },
  underline: { '&::after': { borderColor: props => props.col } },

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


export { DayTextField, DayRatingField, DayNumberField, DayDateField, DaySubmit, DayDone, DayNoMetrics };