import React from 'react';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

function Loading() {
  return (
    <Container fixed display="flex"
      style={{
        flexDirection: 'column',
        alignItems: 'center'
      }}>
      <CircularProgress />
    </Container>
  );
}

export default Loading;