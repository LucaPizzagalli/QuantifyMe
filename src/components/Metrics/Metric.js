import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';

import { logos } from '../CustomIcons'


function Metric({ metric }) {
  let classes = useStyles(metric.color[0]);
  return (
    <Paper className={classes.root} variant="outlined" classes={{ outlined: classes.outlined }}>
      <div className={classes.horizontalFlex}>
        <div className={classes.logo}>
          {logos.get(metric.logo)({ color: metric.color })}
        </div>
      </div>
      { metric.type === 'rating' &&
        <div className={classes.horizontalFlex2}>
          <Rating
            value={metric.length}
            max={metric.length}
            readOnly
            style={{ color: metric.color[0] }}
          />
        </div>
      }
      { metric.type === 'number' &&
        <div className={classes.horizontalFlex2}>
          1234
          </div>
      }
      { metric.type === 'text' &&
        <div className={classes.horizontalFlex2}>
          Text
          </div>
      }
      <Typography>
        {metric.name}
      </Typography>
    </Paper>
  );
}


function MetricFirst({ metric }) {
  let classes = useStyles(metric.color[0]);
  return (
    <Paper className={classes.firstRoot} variant="outlined" classes={{ outlined: classes.outlined }}>
      <div className={classes.horizontalFlex}>
        {metric.type === 'rating' &&
            <Rating
              value={metric.length}
              max={metric.length}
              size="large"
              readOnly
              style={{ color: metric.color[0] }}
            />
        }
        {metric.type === 'number' &&
          <div className={classes.horizontalFlex}>
            1234
            </div>
        }
        {metric.type === 'text' &&
          <div className={classes.horizontalFlex}>
            Text
            </div>
        }
      </div>
      <Typography>
        {metric.name}
      </Typography>
    </Paper>
  );
}


let useStyles = makeStyles(theme => ({
  firstRoot: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    alignItems: 'center',
  },
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    alignItems: 'center',
  },
  chooseRoot: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    alignItems: 'stretch',
  },
  outlined: {
    borderWidth: '2px',
  },
  horizontalFlex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  horizontalFlex2: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  logo: {
    maxWidth: '9rem',
  },
}));

export { Metric, MetricFirst };
