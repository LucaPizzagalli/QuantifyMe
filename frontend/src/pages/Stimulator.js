import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Countdown from '../components/Countdown';

class Stimulator extends React.Component {
  render() {
    return (
      <Container maxWidth='lg'>
        <Paper>
          <Countdown date={'2020-05-01'}lifespan={120} />
        </Paper>
      </Container>);
  }
}

export default Stimulator