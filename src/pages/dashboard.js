import React, {useContext} from 'react';
import Container from '@material-ui/core/Container';
import UserContext from '../components/Firebase';

function Dashboard() {
  let user = useContext(UserContext);

  return (
    <Container maxWidth="md" display="flex">
      {user.getWelcomeMessage()}
    </Container>
  );
}

export default Dashboard
