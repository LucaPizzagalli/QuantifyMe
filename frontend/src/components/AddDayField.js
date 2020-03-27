import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';
import Radio from '@material-ui/core/Radio';
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';

const styles = theme => ({
  paperFocused: {
    'box-shadow': '0 0 1em 0 grey',
    'border-radius': '1em',
    'padding': '3em',
    'margin': '3em -3em 3em -3em',
    'text-align': 'center',
    'alignItems': 'center',
    'transition': theme.transitions.create(['all'], {})
  },
  paperBlurred: {
    'text-align': 'center',
    'margin': '0em 10em 0em 10em',
    'transition': theme.transitions.create(['all'], {})
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textFocused: {
    'transition': theme.transitions.create(['all'], {})
  },
  textBlurred: {
    'fontSize': '0',
    'color': 'white',
    'transition': theme.transitions.create(['all'], {})
  },
  inputFocused: {
    'fontSize': '3em',
    // 'transition': theme.transitions.create(['all'], {})
  },
  inputBlurred: {
    // 'transition': theme.transitions.create(['all'], {})
  },
  ratingFocused: {
    'fontSize': 100,
    'transition': theme.transitions.create(['all'], {})
  },
  ratingBlurred: {
    'transition': theme.transitions.create(['all'], {})
  },
  zeroRatingFocused: {
    'width': 150,
    'height': 150,
    'fontSize': 100,
    'transition': theme.transitions.create(['all'], {})
  },
  zeroRatingBlurred: {
    'transition': theme.transitions.create(['all'], {})
  },
  descriptionFull: {
    'padding': '5em 2em 2em 5em',
  }
});

class DayTextFieldPure extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.isFocused === this.props.isFocused && nextProps.value === this.props.value)
      return false;
    return true;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      if (this.props.isFocused)
        this.inputRef.current.focus();
    }
  }

  render() {
    let classes = this.props.classes;
    let isFocused = this.props.isFocused;
    let key = this.props.label_key;
    return (
      <div className={classes['paper' + (isFocused ? 'Focused' : 'Blurred')]}
        onClick={_ => { this.props.onFocus(key, false); }} >
        <Typography variant='h1' className={classes['text' + (isFocused ? 'Focused' : 'Blurred')]}>
          {this.props.label}
        </Typography>
        <TextField
          InputProps={{ className: (classes['input' + (isFocused ? 'Focused' : 'Blurred')]) }}
          label={this.props.label}
          inputRef={this.inputRef}
          value={this.props.value}
          onChange={(input) => { this.props.onInput(key, input.target.value); }}
          onFocus={(_) => { this.props.onFocus(key, false); }}
          fullWidth={true}
          multiline
        />
        <Collapse in={isFocused} timeout='auto'>
          <div className={classes.descriptionFull}>
            <Typography variant='body1'>{this.props.description}</Typography>
          </div>
        </Collapse>
      </div>
    );
  }
}

class DayRatingFieldPure extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.isFocused === this.props.isFocused && nextProps.valueRating === this.props.valueRating)
      return false;
    return true;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      if (this.props.isFocused) {
        console.log(this.inputRef.current)
        console.log(this.inputRef.current.value)
        this.inputRef.current.focus(); //// Not working, who knows why
      }

    }
  }

  render() {
    let classes = this.props.classes;
    let isFocused = this.props.isFocused;
    let key = this.props.label_key;
    return (
      <div className={classes['paper' + (isFocused ? 'Focused' : 'Blurred')]}
        onClick={_ => { this.props.onFocus(key, false); }} >
        <Typography variant='h1' className={classes['text' + (isFocused ? 'Focused' : 'Blurred')]}>
          {this.props.label}
        </Typography>
        <div className={classes.root}>
          <Typography variant="body1" className={classes['text' + (isFocused ? 'Blurred' : 'Focused')]}>
            {this.props.label}
          </Typography>
          <Radio inputRef={this.inputRef} name={'rating' + key}
            className={(classes['zeroRating' + (isFocused ? 'Focused' : 'Blurred')])}
            value={this.props.valueRating}
            onChange={_ => {
              this.props.onInput(key, 0);
              this.props.onFocus(key, true);
            }}
            onFocus={_ => { this.props.onFocus(key, false); }}
            icon={<RadioButtonUnchecked className={(classes['rating' + (isFocused ? 'Focused' : 'Blurred')])} />}
            checkedIcon={<RadioButtonChecked className={(classes['rating' + (isFocused ? 'Focused' : 'Blurred')])} />} />
          <Rating max={this.props.maxRating}
            className={(classes['rating' + (isFocused ? 'Focused' : 'Blurred')])}
            name={'rating' + key}
            value={this.props.valueRating}
            onChange={(_, rating) => {
              this.props.onInput(key, rating);
              this.props.onFocus(key, true);
            }}
            onFocus={(_) => { this.props.onFocus(key, false); }}
          />
        </div>

        <Collapse in={isFocused} timeout='auto'>
          <div className={classes.descriptionFull}>
            <Typography variant='body1'>{this.props.descriptionRating}</Typography>
          </div>
        </Collapse>
      </div>
    );
  }
}


class DayDateFieldPure extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.isFocused === this.props.isFocused && nextProps.value === this.props.value)
      return false;
    return true;
  }
  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      if (this.props.isFocused)
        this.inputRef.current.focus();
    }
  }
  render() {
    let classes = this.props.classes;
    let isFocused = this.props.isFocused;
    let key = this.props.label_key;
    return (
      <div className={classes['paper' + (isFocused ? 'Focused' : 'Blurred')]} >
        <Typography variant='h1' className={classes['text' + (isFocused ? 'Focused' : 'Blurred')]}>
          {this.props.label}
        </Typography>

        {/* <button type="button" onClick={handleOpen}>
            react-transition-group
      </button>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <h2 id="transition-modal-title">Transition modal</h2>
                <p id="transition-modal-description">react-transition-group animates me.</p>
              </div>
            </Fade>
          </Modal> */}
        <MuiPickersUtilsProvider utils={DateFnsUtils} >
          <DatePicker
            autoOk
            disableFuture
            label={this.props.label}
            onChange={(input) => { this.props.onInput(key, input); }}
            onAccept={(_) => { this.props.onFocus(key, true); }}
            format='yyyy/MM/dd'
            autoFocus={true}
            value={this.props.value}
          />
        </MuiPickersUtilsProvider>
      </div>
    );
  }
}

let DayTextField = withStyles(styles)(DayTextFieldPure);
let DayRatingField = withStyles(styles)(DayRatingFieldPure);
let DayDateField = withStyles(styles)(DayDateFieldPure);

export { DayTextField, DayRatingField, DayDateField };