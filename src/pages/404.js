import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
// import DraggableList from '../components/DraggableList';

function FourOuFour() {
  return (
    <Container fixed style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      <Typography variant="h1" gutterBottom>404</Typography>
      <Typography variant="subtitle1" gutterBottom>
        Page not found
      </Typography>
      {/* <DraggableList items={'Lorem ipsum dolor sit'.split(' ')}/> */}
    </Container>
  );
}

export default FourOuFour;