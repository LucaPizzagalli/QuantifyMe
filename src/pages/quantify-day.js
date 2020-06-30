import React from 'react';
import Container from '@material-ui/core/Container';
// import AddDayForm from '../components/AddDayForm';
import AddDayForm from '../components/DayField2';


function QuantifyDayPage() {
  return (
    <div style={{height:'100vh', overflowX: 'hidden'}}>
      <Container fixed display="flex" style={{ position: 'relative' }}>
        <AddDayForm />
      </Container>
    </div>
  );
}

export default QuantifyDayPage
