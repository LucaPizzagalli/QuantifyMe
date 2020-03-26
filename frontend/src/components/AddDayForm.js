import React from 'react';
import Button from '@material-ui/core/Button';
import { List } from 'semantic-ui-react';
import { DayTextField, DayRatingField, DayDateField } from './AddDayField';

class AddDayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 'day': { 'date': new Date(), 'happiness': '', 'lesson': '', 'recap': '', 'place': '', 'social': '', 'workout': '', 'study': '', 'culture': '', 'work': '', 'finances': '' } };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.legend === 'loading')
      this.render();
  }

  render() {
    let output = <div>Loading</div>;
    if (this.props.legend !== 'loading') {
      let fields = [];
      for (const key of this.props.legend.order) {
        let legend = this.props.legend.legend[key];
        let field = null;
        let label = key[0].toUpperCase() + key.slice(1);
        if (key === 'date') {
          field = <DayDateField label='Date' valuex={this.state.day.date}
            onChange={e => { this.setState({ 'day': { ...this.state.day, 'date': e.target.value } }); }} />
        }
        else if (legend.rating.length > 0)
          field = <DayRatingField label={label} descriptionRating={legend.rating} icon='star' maxRating={5} onInput={(input) => {
            this.setState({ 'day': { ...this.state.day, label: input } });
          }} />
        else
          field = <DayTextField label={label} description={legend.text} valuex={this.state.day.lesson}
            onChange={e => { this.setState({ 'day': { ...this.state.day, label: e.target.value } }); }} />;
        fields.push(<List.Item key={key}>{field}</List.Item>);
      }
      output = <List>
        {fields}
        <List.Item key='submit-button'>
          <Button variant='contained' color='primary'
            onClick={async () => {
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
  }
}

export default AddDayForm