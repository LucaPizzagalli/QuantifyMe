import React from 'react';
import Container from '@material-ui/core/Container';
// import Typography from '@material-ui/core/Typography';
import DraggableList from '../components/DraggableList.js'

function FourOuFour() {
  return (
    <Container>
      <DraggableList padding={40}>
        <div style={{background: 'red', flexGrow: 1}}><p>aaaaa<br />aaaaa</p></div>
        <div><p>bbbbbbbbbb</p></div>
        <div><p>cccccccccc</p></div>
        <div><p>ddddddddd</p></div>
        <div><p>eee<br />ee<br />eeeeeeee</p></div>
        <div><p>fffffffffffffff</p></div>
      </DraggableList>
    </Container>
    // <Container fixed style={{
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     flexDirection: 'column',
    //   }}>
    //   <Typography variant="h1" gutterBottom>404</Typography>
    //   <Typography variant="subtitle1" gutterBottom>
    //     Page not found
    //   </Typography>
    // </Container>
  );
}

export default FourOuFour;