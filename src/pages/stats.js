import React from 'react';
import Container from '@material-ui/core/Container';
import PlotConsole from '../components/Stats/PlotConsole';

function StatsPage () {
    return (
      <Container fixed display="flex" style={{padding: '1.5rem'}}>
          <PlotConsole />
      </Container>
      );
}

export default StatsPage