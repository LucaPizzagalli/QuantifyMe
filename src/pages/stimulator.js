import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TimerList from '../components/Stimulator/TimerList';

class StimulatorPage extends React.Component {
  render() {
    return (
      <Container maxWidth="md" fixed display="flex" style={{padding: '1.5rem'}}>
        <Paper>
        < TimerList />
        </Paper>
      </Container>
      );
  }
}

export default StimulatorPage