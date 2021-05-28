import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Diary from '../components/Diary/Diary';

function DiaryPage() {
  let classes = useStyles();
  return (
    <Container fixed display="flex" className={classes.root}>
      <Diary />
    </Container>
  );
}


let useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
  },
}));


export default DiaryPage;