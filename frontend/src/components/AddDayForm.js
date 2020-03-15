import React from "react";
import { Rating } from "semantic-ui-react";


class AddDayForm extends React.Component {
  constructor(props) {
    super(props);
    let d = new Date();
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    let today = [year, month, day].join('-');

    this.state = { "day": { "date_str": today, "happiness": "", "lesson": "", "recap": "", "place": "", "social": "", "workout": "", "study": "", "culture": "", "work": "", "finances": "" } };
  }

  render() {
    return (
      <div>
        {/* <Form.Input label="Date" type="date"
          value={this.state.day.date_str}
          onChange={e => { this.setState({ "day": { ...this.state.day, "date_str": e.target.value } }) }}
        />
        <Popup trigger={<p>info</p>} wide> {this.props.legend.date} </Popup>
*/}

        <DayRatingField label='Happiness' icon='star' maxRating={5} onInput={(input) => {
          this.setState({ 'day': { ...this.state.day, 'happiness': input } });
        }} />
        <DayRatingField label='Workout' icon='star' maxRating={3} onInput={(input) => {
          this.setState({ 'day': { ...this.state.day, 'workout': input } });
        }} />
        <DayTextField label='Lesson' valuex={this.state.day.lesson}
          onChange={e => { this.setState({ "day": { ...this.state.day, "lesson": e.target.value } }); }}
        />
        <DayTextField label='Recap' valuex={this.state.day.lesson}
          onChange={e => { this.setState({ "day": { ...this.state.day, "recap": e.target.value } }); }}
        />
        <DayTextField label='Social' valuex={this.state.day.lesson}
          onChange={e => { this.setState({ "day": { ...this.state.day, "social": e.target.value } }); }}
        />
        <DayTextField label='Study' valuex={this.state.day.lesson}
          onChange={e => { this.setState({ "day": { ...this.state.day, "study": e.target.value } }); }}
        />
        <DayTextField label='Culture' valuex={this.state.day.lesson}
          onChange={e => { this.setState({ "day": { ...this.state.day, "culture": e.target.value } }); }}
        />
        <DayTextField label='Work' valuex={this.state.day.lesson}
          onChange={e => { this.setState({ "day": { ...this.state.day, "work": e.target.value } }); }}
        />
        <DayTextField label='Place' valuex={this.state.day.lesson}
          onChange={e => { this.setState({ "day": { ...this.state.day, "place": e.target.value } }); }}
        />
        <button onClick={async () => {
          const response = await fetch("/add_day", {
            method: "POST",
            headers: { "Content-Type": "application/JSON" },
            body: JSON.stringify(this.state.day)
          });
          if (response.ok) {
            this.props.onNewDay(this.state.day);
            this.setState({ "day": { "date_str": "", "happiness": "", "lesson": "", "recap": "", "place": "", "social": "", "workout": "", "study": "", "culture": "", "work": "", "finances": "" } });
          }
        }}>
          submit
          </button>
      </div>
    );
  }
}

class DayTextField extends React.Component {
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
      <div className={'DayFormElement ' + (this.state.isFocused ? 'Focused' : 'Unfocused')}
        onClick={_ => { this.inputRef.current.focus(); }}>
        <label>{this.props.label}</label>
        {/* value={this.state.day.social}  */}
        <input
          ref={this.inputRef}
          onChange={this.props.onInput}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
      </div>
    );
  }
}

class DayRatingField extends React.Component {
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
      <div className={'DayFormElement ' + (this.state.isFocused ? 'Focused' : 'Unfocused')}
        onClick={_ => { this.inputRef.current.focus(); }}>
        <label>{this.props.label}</label>

        <input ref={this.inputRef} type="radio" name="gender" value="male" onFocus={this.onFocus} onBlur={this.onBlur}></input>
        <Rating icon={this.props.icon} defaultRating={this.props.defaultRating} maxRating={this.props.maxRating}
          onRate={(_, rating) => {
            this.props.onInput(rating.rating);
            this.setState({ isFocused: false });
          }}
          onFocus={this.onFocus} onBlur={this.onBlur} />
      </div>
    );
  }
}

export default AddDayForm