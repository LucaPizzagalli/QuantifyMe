import React from 'react';
import Container from '@material-ui/core/Container';
import Dashboard from '../components/Dashboard';

function DashboardPage() {
  return (
    <Container fixed display="flex">
      <Dashboard />
    </Container>
  );
}

export default DashboardPage
