import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import HappinessPlot from '../components/HappinessPlot';

class Stats extends React.Component {
  render() {
    return (
      <Container maxWidth="lg">
        <Paper>
          <HappinessPlot />
        </Paper>
      </Container>);
  }
}

export default Stats