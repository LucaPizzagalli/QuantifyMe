import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';
import Radio from '@material-ui/core/Radio';
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
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
    alignItems: 'center'
  },
  hFocused: {
    'transition': theme.transitions.create(['all'], {})
  },
  hBlurred: {
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
    'width': 200,
    'height': 200,
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
    this.state = { isFocused: false };
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.inputRef = React.createRef();
  }

  onFocus() {
    this.setState({ isFocused: true });
  }

  onBlur() {
    this.setState({ isFocused: false });
  }

  render() {
    let classes = this.props.classes;
    return (
      <div className={classes['paper' + (this.state.isFocused ? 'Focused' : 'Blurred')]}
      // onClick={_ => { this.inputRef.current.focus(); }}
      >
        <Typography variant='h1' className={classes['h' + (this.state.isFocused ? 'Focused' : 'Blurred')]}>
          {this.props.label}
        </Typography>
        {/* value={this.state.day.social}  */}
        <TextField
          InputProps={{ className: (classes['input' + (this.state.isFocused ? 'Focused' : 'Blurred')]) }}
          label={this.props.label}
          inputRef={this.inputRef}
          onChange={this.props.onInput}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          fullWidth={true}
          multiline
        />
        <Collapse in={this.state.isFocused} timeout='auto'>
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
    this.state = { 'isFocused': false, 'rating': 0 };
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.inputRef = React.createRef();
  }

  onFocus() {
    this.setState({ isFocused: true });
  }

  onBlur() {
    this.setState({ isFocused: false });
  }

  render() {
    let classes = this.props.classes;
    return (
      <div className={classes['paper' + (this.state.isFocused ? 'Focused' : 'Blurred')]}
        onMouseDown={_ => { this.inputRef.current.focus(); }}
      >
        <Typography variant='h1' className={classes['h' + (this.state.isFocused ? 'Focused' : 'Blurred')]}>
          {this.props.label}
        </Typography>
        <div className={classes.root}>
          {/* <Typography variant="body1" > */}
          {this.props.label}
          {/* </Typography> */}
          <Radio ref={this.inputRef} name={'rating' + this.props.label}
            className={(classes['zeroRating' + (this.state.isFocused ? 'Focused' : 'Blurred')])}
            value={this.state.rating}
            onChange={(_, __) => {
              this.props.onInput(0);
              this.setState({ 'rating': 0, isFocused: false });
            }}
            onFocus={this.onFocus} onBlur={this.onBlur}
            icon={<RadioButtonUnchecked className={(classes['rating' + (this.state.isFocused ? 'Focused' : 'Blurred')])} />}
            checkedIcon={<RadioButtonChecked className={(classes['rating' + (this.state.isFocused ? 'Focused' : 'Blurred')])} />} />
          <Rating max={this.props.maxRating}
            className={(classes['rating' + (this.state.isFocused ? 'Focused' : 'Blurred')])}
            name={'rating' + this.props.label}
            value={this.state.rating}
            onChange={(_, rating) => {
              this.props.onInput(rating);
              this.setState({ 'rating': rating, isFocused: false });
            }}
            onFocus={this.onFocus} onBlur={this.onBlur} />
        </div>

        <Collapse in={this.state.isFocused} timeout='auto'>
          <div className={classes.descriptionFull}>
            <Typography variant='body1'>{this.props.descriptionRating}</Typography>
          </div>
        </Collapse>
      </div>
    );
  }
}


class DayDateFieldPure extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isFocused: false };
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.inputRef = React.createRef();
  }

  onFocus() {
    this.setState({ isFocused: true });
  }

  onBlur() {
    this.setState({ isFocused: false });
  }

  render() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils} >
        <div className={this.props.classes['paper' + (this.state.isFocused ? 'Focused' : 'Blurred')]}
        // onClick={_ => { console.log(this.inputRef);this.inputRef.current.focus(); }}
        >
          <Typography variant='h1' className={this.props.classes['h' + (this.state.isFocused ? 'Focused' : 'Blurred')]}>
            {this.props.label}
          </Typography>
          {/* <KeyboardDatePicker
        autoOk
        variant="inline"
        inputVariant="outlined"
        label="With keyboard"
        format="MM/dd/yyyy"
        // value={selectedDate}
        InputAdornmentProps={{ position: "start" }}
        // onChange={date => handleDateChange(date)}
        /> */}

          <KeyboardDatePicker
            // ref={this.inputRef}
            label={this.props.label}
            onChange={this.props.onInput}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            disableToolbar
            variant='inline'
            format='yyyy/MM/dd'
            margin='normal'
            autoFocus={true}
            // pickerRef={(node) => { this.inputRef = node; }}//{this.inputRef}
            // value={this.state.day.date}
            // onChange={(input) => {
            //   this.setState({ 'day': { ...this.state.day, 'date': input } });
            // }}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </div>
      </MuiPickersUtilsProvider>
    );
  }
}

let DayTextField = withStyles(styles)(DayTextFieldPure);
let DayRatingField = withStyles(styles)(DayRatingFieldPure);
let DayDateField = withStyles(styles)(DayDateFieldPure);

export { DayTextField, DayRatingField, DayDateField };