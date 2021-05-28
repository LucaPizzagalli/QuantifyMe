import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import EditableGroup from '../components/Metrics/EditableGroup';


function EditMetricsPage() {
  let classes = useStyles();
  return (
    <Container maxWidth="md" display="flex" className={classes.root}>
      <EditableGroup />
    </Container>
  );
}


let useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
  },
}));


export default EditMetricsPage;