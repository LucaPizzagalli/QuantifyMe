import React from 'react';
import Button from '@material-ui/core/Button';
import { List } from 'semantic-ui-react';
import { DayTextField, DayRatingField, DayDateField } from './AddDayField';

class AddDayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'focused': 'date',
      'day': { 'date': new Date(), 'happiness': -1, 'lesson': '', 'recap': '', 'place': '', 'social': -1, 'workout': -1, 'study': '', 'culture': '', 'work': '', 'finances': '' }
    };
    this.changeFocus = this.changeFocus.bind(this);
    this.onInput = this.onInput.bind(this);
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.legend === 'loading'){
  //     // this.setState(this.state)
  //   }
  // }

  changeFocus(key, isNext) {
    if (isNext){
      let index = this.props.legend.order.indexOf(key) + 1;
      this.setState({'focused': this.props.legend.order[index]});
    }
    else
      this.setState({'focused': key});
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
        // console.log(key)
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
              console.log(this.state.day);
              const response = await fetch('/add_day', {
                method: 'POST',
                headers: { 'Content-Type': 'application/JSON' },
                body: JSON.stringify(this.state.day)
              });
              if (response.ok) {
                this.props.onNewDay(this.state.day);
                this.setState({ 'day': { 'date_str': '', 'happiness': '', 'lesson': '', 'recap': '', 'place': '', 'social': '', 'workout': '', 'study': '', 'culture': '', 'work': '', 'finances': '' } });
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