import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import UserContext from './Firebase';

function SignOutButton() {
  let user = useContext(UserContext);

  function handleSignOut() {
    user.configAuth.signOut()
      .then(authUser => {
        console.log('signOut successful');
      })
      .catch(error => {
        console.log('error');
        console.log(error);
      });
  }

  return (
    <Button
      color="inherit"
      onClick={handleSignOut}>
      Sign Out
    </Button>
  );
}

export default SignOutButton