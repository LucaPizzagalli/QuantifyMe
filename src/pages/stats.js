import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import HappinessPlot from '../components/HappinessPlot';

function StatsPage () {
    return (
      <Container maxWidth='md'>
        <Paper>
          <HappinessPlot />
        </Paper>
      </Container>
      );
}

export default StatsPage