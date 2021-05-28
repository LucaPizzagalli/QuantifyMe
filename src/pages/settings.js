import React from 'react';
import Container from '@material-ui/core/Container';
import Settings from '../components/Account/Settings';

function SettingsPage({changeTheme}) {
  return (
    <Container fixed display="flex">
      <Settings changeTheme={changeTheme} />
    </Container>
  );
}

export default SettingsPage;