import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Countdown from '../components/Countdown';

class StimulatorPage extends React.Component {
  render() {
    return (
      <Container fixed>
        <Paper>
        < Countdown waitingTime={5} />
        </Paper>
      </Container>);
  }
}

export default StimulatorPage