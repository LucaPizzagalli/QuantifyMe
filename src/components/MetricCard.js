import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';

function MetricCard({ metric, interactive, HandleEditMetric }) {
  let [isExpanded, setIsExpanded] = useState(false);

  let classes = useStyles();

  return (
    <Card>
      <CardHeader
        action={
          interactive &&
          <IconButton aria-label="edit" onClick={() => HandleEditMetric(metric.id)}>
            <EditIcon />
          </IconButton>
        }
        title={metric.name}
      />
      <CardContent>
        <Typography paragraph>
          {metric.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: isExpanded,
          })}
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-label="show more"
        >
          {metric.type === 'rating' && <ExpandMoreIcon />}
        </IconButton>
      </CardActions>
      {
        metric.type === 'rating' &&
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <CardContent>
            {metric.details.map((detail, index) =>
              <Typography paragraph key={index}>
                {detail}
              </Typography>
            )}
          </CardContent>
        </Collapse>
      }
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default MetricCard;