import React from 'react';
import Container from '@material-ui/core/Container';
import MetricList from '../components/Metrics/MetricList';

function MetricsPage() {
  return (
    <Container maxWidth="md" display="flex" style={{padding: '1.5rem'}}>
      <MetricList />
    </Container>
  );
}

export default MetricsPage;