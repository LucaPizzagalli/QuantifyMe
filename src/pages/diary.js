import React from 'react';
import Container from '@material-ui/core/Container';
import Diary from '../components/Diary';

function DiaryPage() {
  return (
    <Container fixed display="flex" style={{padding: '1.5rem'}}>
      <Diary />
    </Container>
  );
}

export default DiaryPage
