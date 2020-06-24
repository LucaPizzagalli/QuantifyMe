import React from 'react';
import Container from '@material-ui/core/Container';
import Diary from '../components/Diary';

function DiaryPage() {
  return (
    <Container maxWidth="xl" display="flex">
      <Diary />
    </Container>
  );
}

export default DiaryPage