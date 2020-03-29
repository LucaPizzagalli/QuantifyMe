import React from 'react';
import Report from '../components/Report';
import AddDayForm from '../components/AddDayForm';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 'report': [], 'legend': 'loading' };
    fetch('/get_last_10_days').then(response => response.json().then(data => {
      this.setState({ 'report': data });
    }));
    fetch('/get_legend').then(response => response.json().then(data => {
      this.setState({ 'legend': data });
    }));
  }

  render() {
    return (
      <Container maxWidth="lg">
        <Container maxWidth="md">
          <Typography variant='body1'>perchè sono così piccolo?</Typography>
          <AddDayForm legend={this.state.legend} onNewDay={day => this.setState({ 'report': [day, ...this.state.report] })} />
        </Container>
        <Report report={this.state.report} legend={this.state.legend} />
      </Container>
    );
  }
}

export default Home