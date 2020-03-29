import React from 'react';
import Button from '@material-ui/core/Button';
import { List } from 'semantic-ui-react';
import { DayTextField, DayRatingField, DayDateField } from './AddDayField';

class AddDayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 'day': 'loading', 'focused': 'date' };
    this.changeFocus = this.changeFocus.bind(this);
    this.onInput = this.onInput.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.legend !== 'loading' && state.day === 'loading')
      return { 'day': AddDayForm.resetState(props.legend.legend) };
    return null;
  }

  static resetState(legend) {
    let day = {};
    for (let [key, value] of Object.entries(legend)) {
    if (key === 'date')
        day[key] = new Date();
      else if (value.rating.length > 0)
        day[key] = -1;
      else
        day[key] = '';
    }
    return day;
  }

  changeFocus(key, isNext) {
    if (isNext) {
      let index = this.props.legend.order.indexOf(key) + 1;
      this.setState({ 'focused': this.props.legend.order[index] });
    }
    else
      this.setState({ 'focused': key });
  }

  onInput(key, input) {
    let dayState = this.state.day;
    dayState[key] = input;
    this.setState({ 'day': dayState });
  }

  render() {
    let output = <div>Loading</div>;
    if (this.props.legend !== 'loading') {
      let fields = [];
      for (let key of this.props.legend.order) {
        let legend = this.props.legend.legend[key];
        let field = null;
        let label = key[0].toUpperCase() + key.slice(1);
        if (key === 'date') {
          field = <DayDateField label_key={key} label={label} value={this.state.day[key]}
            onFocus={this.changeFocus}
            isFocused={this.state.focused === key}
            onInput={this.onInput}
          // onChange={e => { this.setState({ 'day': { ...this.state.day, 'date': e.target.value } }); }}
          />
        }
        else if (legend.rating.length > 0)
          field = <DayRatingField label_key={key} label={label} descriptionRating={legend.rating} valueRating={this.state.day[key]}
            icon='star' maxRating={5}
            onFocus={this.changeFocus}
            isFocused={this.state.focused === key}
            onInput={this.onInput} />
        else
          field = <DayTextField label_key={key} label={label} description={legend.text} value={this.state.day[key]}
            onFocus={this.changeFocus}
            isFocused={this.state.focused === key}
            onInput={this.onInput} />;
        fields.push(<List.Item key={key}>{field}</List.Item>);
      }
      output = <List>
        {fields}
        <List.Item key='submit-button'>
          <Button variant='contained' color='primary'
            onClick={async () => {
              let day = this.state.day;
              day.date = day.date.toISOString().slice(0, 10);
              const response = await fetch('/add_day', {
                method: 'POST',
                headers: { 'Content-Type': 'application/JSON' },
                body: JSON.stringify(day)
              });
              if (response.ok) {
                this.props.onNewDay(day);
                console.log('ha funzionato');
                this.setState({'day': AddDayForm.resetState(this.props.legend.legend)});
              }
            }}>
            submit
          </Button>
        </List.Item>
      </List>;
    }
    return (output);
    // return (<MaterialUIPickers />);
  }
}

export default AddDayForm