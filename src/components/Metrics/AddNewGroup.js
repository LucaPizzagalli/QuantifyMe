import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CardActionArea from '@material-ui/core/CardActionArea';
import AddIcon from '@material-ui/icons/Add';


function AddNewGroup({ groupId }) {
  let classes = useStyles();

  return (
    <Paper className={classes.root}>
      <CardActionArea
        aria-label="add-metric-group"
        component={RouterLink}
        to={`/edit-metrics?group=${groupId}`}
        className={classes.area}
      >
        <AddIcon fontSize="large"/>
      </CardActionArea>
    </Paper >
  );
}

let useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'extend',
    width: '80%',
  },
  area: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3,3,3,3),
  },
}));

export default AddNewGroup;
