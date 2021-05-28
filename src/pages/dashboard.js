import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Dashboard from '../components/Dashboard';

function DashboardPage() {
  let classes = useStyles();
  return (
    <Container fixed display="flex" className={classes.root}>
      <Dashboard />
    </Container>
  );
}


let useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
  },
}));


export default DashboardPage;