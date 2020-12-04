import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';

function DayCard({ metrics, day }) {
  let [isSelected, setIsSelected] = useState(false);

  let classes = useStyles();

  let fields = [];
  for (let metric of metrics) {
    if (metric.type === 'text' && day[metric.id])
      fields.push(
        <div key={metric.id} className={classes.field}>
          <Typography variant='body1' className={classes.name}><strong>{metric.name}</strong></Typography>
          <Typography variant='body1' className={classes.value}>{day[metric.id]}</Typography>
        </div>
      );
    else if (metric.type === 'number' && day[metric.id] !== undefined)
      fields.push(
        <div key={metric.id} className={classes.field}>
          <Typography variant='body1' className={classes.name}><strong>{metric.name}</strong></Typography>
          <Typography variant='body1' className={classes.value}>{day[metric.id]}</Typography>
        </div>
      );
    else if (metric.type === 'rating' && day[metric.id] >= 0)
      fields.push(
        <div key={metric.id} className={classes.field}>
          <Typography variant='body1' className={classes.name}><strong>{metric.name} </strong></Typography>
          <Rating
          max={metric.details.length}
          name={metric.id}
          value={day[metric.id]}
          readOnly
          className={classes.value}/>
        </div>
      );
  }
  return (
    <Card onClick={() => setIsSelected(!isSelected)} >
      <CardActionArea>
        <CardHeader title={(new Date(day.date)).toISOString().slice(0, 10)} />
        <CardContent className={isSelected ? classes.rootExpanded : classes.root}>
          {fields}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

let useStyles = makeStyles(theme => ({
  field: {
    display: 'flex',
  },
  name: {
    minWidth: '30%',
  },
  value: {
    flexGrow: 1,
  },
  root: {
    position: 'relative',
    height: '15rem',
    // '&::after': {
    //   content: '""',
    //   position: 'absolute',
    //   zIndex: 1,
    //   bottom: 0,
    //   left: 0,
    //   backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255, 1) 90%)',
    //   width: '100%',
    //   height: '4em',
    //   pointerEvents: 'none',
    // }
  },
  rootExpanded: {
    background: theme.palette.background.paper,
    position: 'relative',
    minHeight: '15rem',
    height: 'auto'
  }
}));

export default DayCard;