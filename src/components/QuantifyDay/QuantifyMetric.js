import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import { Input } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CardActionArea from '@material-ui/core/CardActionArea';

import { logos } from '../CustomIcons'


function parseNumber(text) {
  let num = '';
  for (let char of text)
    if ((char >= '0' && char <= '9') || char === '.' || char === '-')
      num += char;
  return num;
}

function QuantifyMetric({ metric, value, updateDayInfo }) {

  let classes = useStyles(metric.color[0]);
  return (
    <Paper className={classes.root} variant="outlined" classes={{ outlined: classes.outlined }}>
      { metric.type !== 'boolean' &&
        <div className={classes.horizontalFlex}>
          <div className={classes.logo}>
            {logos.get(metric.logo)({ color: metric.color })}
          </div>
        </div>
      }
      { metric.type === 'rating' &&
        <div className={classes.horizontalFlex2}>
          <Rating
            name={metric.id}
            value={value == null ? -1 : value}
            max={metric.length}
            onChange={(e, newValue) => updateDayInfo(metric.id, newValue)}
            style={{ color: metric.color[0] }}
          />
        </div>
      }
      { metric.type === 'number' &&
        <div className={classes.horizontalFlex2}>
          <IconButton
            aria-label="decrease-value"
            onClick={() => updateDayInfo(metric.id, value ? parseFloat(value) - 1 : -1)}
          >
            <RemoveIcon />
          </IconButton>
          <Input
            value={value == null ? '' : value}
            onChange={(e) => updateDayInfo(metric.id, parseNumber(e.target.value))}
            style={{ width: '6ch' }}
          />
          <IconButton
            aria-label="increase-value"
            onClick={() => updateDayInfo(metric.id, value ? parseFloat(value) + 1 : 1)}
          >
            <AddIcon />
          </IconButton>
        </div>
      }
      { metric.type === 'text' &&
        <div className={classes.horizontalFlex2}>
          <Input
            value={value == null ? '' : value}
            multiline
            onChange={(e) => updateDayInfo(metric.id, e.target.value)}
          />
        </div>
      }
      { metric.type === 'boolean' &&
        <div className={classes.horizontalFlex}>
          <CardActionArea
            onClick={() => updateDayInfo(metric.id, !value)}
            className={classes.horizontalFlex2} >
            <div className={classes.logo}>
              {logos.get(metric.logo)({ color: value ? metric.color : ['#999999', '#777777'] })}
            </div>
          </CardActionArea>
        </div>
      }
      <Typography>
        {metric.name}
      </Typography>
    </Paper>
  );
}


function QuantifyMetricFirst({ metric, value, updateDayInfo }) {
  let classes = useStyles(metric.color[0]);
  return (
    <Paper className={classes.firstRoot} variant="outlined" classes={{ outlined: classes.outlined }}>
      <div className={classes.horizontalFlex}>
        {metric.type === 'rating' &&
          <Rating
            name={metric.id}
            value={value == null ? -1 : value}
            max={metric.length}
            size="large"
            onChange={(e, newValue) => updateDayInfo(metric.id, newValue)}
            style={{ color: metric.color[0] }}
          />
        }
        {metric.type === 'number' &&
          <div className={classes.horizontalFlex}>
            <IconButton
              aria-label="decrease-value"
              onClick={() => updateDayInfo(metric.id, value == null ? -1 : parseFloat(value) - 1)}
            >
              <RemoveIcon />
            </IconButton>
            <Input
              value={value == null ? '' : value}
              onChange={(e) => updateDayInfo(metric.id, parseNumber(e.target.value))}
            />
            <IconButton
              aria-label="increase-value"
              onClick={() => updateDayInfo(metric.id, value == null ? 1 : parseFloat(value) + 1)}
            >
              <AddIcon />
            </IconButton>
          </div>
        }
        {metric.type === 'text' &&
          <div className={classes.horizontalFlex}>
            <Input
              value={value == null ? '' : value}
              onChange={(e) => updateDayInfo(metric.id, e.target.value)}
            />
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

export { QuantifyMetric, QuantifyMetricFirst };
