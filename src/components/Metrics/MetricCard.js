import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Rating from '@material-ui/lab/Rating';
import Slider from '@material-ui/core/Slider';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';

function MetricCard({ metric, interactive, HandleEditMetric }) {
  let [isExpanded, setIsExpanded] = useState(false);

  let classes = useStyles();
  return (
    <Paper className={classes.verticalFlex}>
      <div className={classes.baseCard}>
        <div className={classes.image}>
          <img src='https://upload.wikimedia.org/wikipedia/it/9/98/Microsoft_Edge_logo_%282019%29.svg'
            alt='metric-logo'
            style={{ maxWidth: '100%', draggable: 'false', userSelect: 'none', userDrag: 'none', pointerEvents: 'none' }} />
        </div>
        <div className={classes.info}>
          <Typography variant="h4" component="h2" className={classes.title}>
            {metric.name}
          </Typography>
          {metric.type === 'rating' &&
            <Rating className={classes.type}
              value={metric.details.length - 1}
              max={metric.details.length - 1}
              size="large"
              readOnly />
          }
          {metric.type === 'number' &&
            <Slider style={{ width: '60%', }} className={classes.type}
              min={metric.range[0]}
              max={metric.range[1]}
              value={metric.range}
              aria-labelledby="range-slider"
              valueLabelDisplay="off"
              marks={[{ value: metric.range[0], label: metric.range[0] }, { value: metric.range[1], label: metric.range[1] }]}
              readOnly
            />
          }
          {metric.type === 'text' &&
            <div className={classes.info}>
              <Typography component="div" variant="h5" fontWeight="fontWeightBold" style={{ textShadow: '0px 1px, 1px 0px, 1px 1px', letterSpacing: '1px' }}>
                <Typography component="span" variant="h4">A</Typography>aa
              </Typography>
            </div>
          }
          <Typography paragraph className={classes.description}>
            {metric.description}
          </Typography>
        </div>
      </div>
      <IconButton aria-label="edit" onClick={() => HandleEditMetric(metric.id)} className={classes.edit}>
        <EditIcon />
      </IconButton>
      {metric.type === 'rating' &&
        <>
          <IconButton
            className={isExpanded ? clsx(classes.expand, classes.expandOpen) : classes.expand}
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-label="show more" >
            <ExpandMoreIcon />
          </IconButton>
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            {metric.details.map((detail, index) =>
              <Typography paragraph key={index}>
                {detail}
              </Typography>
            )}
          </Collapse>
        </>
      }
    </Paper>
  );
}

let useStyles = makeStyles((theme) => ({
  verticalFlex: {
    // maxWidth: 345,
    flexGrow: 1,
    display: 'flex',
    padding: '1rem 2rem 1rem 2rem',
    flexDirection: 'column',
  },
  baseCard: {
    // maxWidth: 345,
    flexGrow: 1,
    display: 'flex',
  },
  image: {
    flex: '1 1 20%',
    margin: '2rem 2rem 2rem 2rem',
  },
  info: {
    flex: '3 3 80%',
    margin: '1rem 2rem 1rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    margin: '1rem 0 1rem 0',
  },
  type: {
    margin: '1rem 0 1rem 0',

  },
  description: {
    flexGrow: 1,
    margin: '1rem 0 1rem 0',
  },
  edit: {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
  },

  expand: {
    position: 'absolute',
    bottom: '0',
    left: 0,
    right: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default MetricCard;