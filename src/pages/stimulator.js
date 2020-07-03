import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TimerList from '../components/TimerList';

class StimulatorPage extends React.Component {
  render() {
    return (
      <Container fixed>
        <Paper>
        < TimerList />
        </Paper>
      </Container>
      );
  }
}

export default StimulatorPage