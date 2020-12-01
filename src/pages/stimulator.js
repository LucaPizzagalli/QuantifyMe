import React from 'react';
import Container from '@material-ui/core/Container';
import ClockList from '../components/Stimulator/ClockList';

class StimulatorPage extends React.Component {
  render() {
    return (
      <Container maxWidth="md" fixed display="flex" style={{ padding: '1.5rem' }}>
        < ClockList />
      </Container>
    );
  }
}

export default StimulatorPage