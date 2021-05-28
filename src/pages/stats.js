import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Stats from '../components/Stats/Stats';


function StatsPage() {
  let classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.root}>
      <Stats />
    </Container>
  );
}

let useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0, 1, 1, 1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default StatsPage