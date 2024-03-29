import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Groups from '../components/Metrics/Groups';

function MetricsPage() {
  let classes = useStyles();
  return (
    <Container maxWidth="md" display="flex" className={classes.root}>
      <Groups />
    </Container>
  );
}


let useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
  },
}));
export default MetricsPage;