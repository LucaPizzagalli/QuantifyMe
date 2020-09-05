import React from 'react';
import Container from '@material-ui/core/Container';
import PlotConsole from '../components/Stats/PlotConsole';

function StatsPage () {
    return (
      <Container fixed>
          <PlotConsole />
      </Container>
      );
}

export default StatsPage