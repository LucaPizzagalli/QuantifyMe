import React, { useContext } from 'react';
import Container from '@material-ui/core/Container';
import UserContext from '../components/Firebase';
import UserSettings from '../components/Account/UserSettings';


function AccountPage() {
  let user = useContext(UserContext);

  return (
    <Container fixed display="flex">
      <h1>Account: {user.auth.email}</h1>
      <UserSettings />
    </Container>
  );
}

export default AccountPage;