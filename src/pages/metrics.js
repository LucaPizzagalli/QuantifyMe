import React from 'react';
import Container from '@material-ui/core/Container';
import MetricList from '../components/MetricList';

function MetricsPage() {
  return (
    <Container fixed display="flex">
      <MetricList />
    </Container>
  );
}

export default MetricsPage;