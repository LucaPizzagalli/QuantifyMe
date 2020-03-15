import React from 'react';
import { Report } from '../components/Report';
import AddDayForm from '../components/AddDayForm';
import { Container } from 'semantic-ui-react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 'report': [], 'legend': {} };
    fetch('/get_last_10_days').then(response => response.json().then(data => {
      this.setState({ 'report': data });
    }));
    fetch('/get_legend').then(response => response.json().then(data => {
      this.setState({ 'legend': data });
    }));
  }

  render() {
    return (
      <Container>
        <AddDayForm legend={this.state.legend} onNewDay={day => this.setState({ 'report': [day, ...this.state.report] })} />
        <Report report={this.state.report} />
      </Container>
    );
  }
}

export default Home