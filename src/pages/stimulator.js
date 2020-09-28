import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import ClockList from '../components/Stimulator/ClockList';

class StimulatorPage extends React.Component {
  render() {
    return (
      <Container maxWidth="md" fixed display="flex" style={{padding: '1.5rem'}}>
        <Paper>
        < ClockList />
        </Paper>
      </Container>
      );
  }
}

export default StimulatorPage