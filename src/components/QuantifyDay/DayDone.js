import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

function DayDone() {
  let classes = useStyles();
  return (
    <Paper className={classes.root} elevation={8} >
      <Typography variant="h3" className={classes.title}>You Made It</Typography>
      <Typography variant="body1" className={classes.description}>Good job. Today is done.</Typography>
    </Paper>
  );
}

let useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    position: 'relative',
    width: '100%',
    paddingTop: '3%',
    paddingBottom: '3%',
    margin: '0',
    borderRadius: '1em',
    // boxShadow: '0 0 4rem 0 blue',
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  description: {
    flexGrow: 1,
    textAlign: 'center',
    paddingTop: '2rem',
    paddingBottom: '2rem',
  },
}));

export default DayDone;