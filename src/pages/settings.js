import React from 'react';
import Container from '@material-ui/core/Container';
import Settings from '../components/Account/Settings';

function SettingsPage() {
  return (
    <Container fixed display="flex">
      <Settings />
    </Container>
  );
}

export default SettingsPage;