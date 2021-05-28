import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';

import { QuantifyMetric, QuantifyMetricFirst } from '../QuantifyDay/QuantifyMetric';

function QuantifyGroup({ group, index, metrics, values, updateDayInfo }) {

  let classes = useStyles();
  return (
    <Paper className={classes.preRoot} elevation={8} >
      <div className={classes.root} key={0}>
      <QuantifyMetricFirst metric={metrics[0]} value={values[0]} updateDayInfo={updateDayInfo} />
        {
          metrics.slice(1).map((metric, index) =>
            <div className={classes.metricCell} key={index+1}>
              <QuantifyMetric metric={metric} value={values[index+1]} updateDayInfo={updateDayInfo} />
            </div>
          )
        }
      </div>
    </Paper >
  );
}

let useStyles = makeStyles(theme => ({
  preRoot: {
    flexGrow: 1,
    maxWidth: '55rem',
    borderRadius: '1em',
    overflowX: 'hidden',
    overflowY: 'auto',
    // boxShadow: '0 0 4rem 0 blue',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: theme.spacing(3),
  },
  metricCell: {
    flex: '0 0 50%',
    padding: theme.spacing(2),
  },
}));

export default QuantifyGroup;
