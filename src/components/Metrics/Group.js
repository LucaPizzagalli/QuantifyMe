import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import { Metric, MetricFirst } from './Metric';

function Group({ group, metrics, isEditable }) {
  let classes = useStyles();

  return (
    <Paper className={classes.root}>
      {isEditable &&
        <IconButton
          aria-label="edit"
          className={classes.edit}
          component={RouterLink}
          to={`/edit-metrics?group=${group.id}`}
        >
          <EditIcon />
        </IconButton>
      }
      <MetricFirst metric={metrics[0]} />
        {
          metrics.slice(1).map((metric, index) =>
            <div className={classes.metricCell} key={index}>
              <Metric metric={metric} />
            </div>
          )
        }
    </Paper >
  );
}

let useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: theme.spacing(2),
  },
  metricCell: {
    flex: '0 0 50%',
    padding: theme.spacing(2),
  },
  edit: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

export default Group;
