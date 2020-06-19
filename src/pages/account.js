import React, { useContext } from 'react';
import Container from '@material-ui/core/Container';
import UserContext from '../components/Firebase';
import AlertContext from '../components/Header';
// import { PasswordForgetForm } from '../PasswordForget';
// import PasswordChangeForm from '../PasswordChange';

function AccountPage() {
  let user = useContext(UserContext);
  let showAlert = useContext(AlertContext);

  return (
    <Container maxWidth="md" display="flex">
      <h1>Account: {user.auth.email}</h1>
      {/* <PasswordForgetForm />
        <PasswordChangeForm /> */}
      <button onClick={() => showAlert('YESS')}>Show message A</button>
    </Container>
  );
}

export default AccountPage;