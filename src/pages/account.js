import React, { useContext } from 'react';
import Container from '@material-ui/core/Container';
import UserContext from '../components/Firebase';
import AlertContext from '../components/Layout';
import UserSettings from '../components/UserSettings';
// confirmPasswordReset
function AccountPage() {
  let user = useContext(UserContext);
  let showAlert = useContext(AlertContext);

  return (
    <Container fixed display="flex">
      <h1>Account: {user.auth.email}</h1>
      <button onClick={() => showAlert('YESS')}>Just show a message</button>
      <UserSettings />
    </Container>
  );
}

export default AccountPage;