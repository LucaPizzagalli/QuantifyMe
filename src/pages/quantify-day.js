import React from 'react';
import Container from '@material-ui/core/Container';
import AddDayForm from '../components/AddDayForm';


function QuantifyDayPage() {
  return (
    <Container maxWidth="md" display="flex">
      <AddDayForm />
    </Container>
  );
}

export default QuantifyDayPage
