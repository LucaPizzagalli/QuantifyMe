import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';

function DayCard({ metrics, day }) {
  let [isSelected, setIsSelected] = useState(false)

  let classes = useStyles();
  return (
    <Card className={isSelected ? classes.rootExpanded : classes.root} onClick={() => setIsSelected(!isSelected)} >
      <CardHeader title={day.date} />
      <CardContent>
        {metrics.map((metric) => {
          if (metric.type === 'text')
            return (
              <div key={metric.id}>
                <Typography variant='body1'><strong>{metric.name} </strong>{day[metric.id]}</Typography>
              </div>
            );
          if (metric.type === 'rating')
            return (
              <div key={metric.id}>
                <Typography variant='body1'><strong>{metric.name} </strong></Typography>
                <Rating max={metric.details.length} name={metric.id} value={day[metric.id]} readOnly />
              </div>
            );
          return null;
        })}
      </CardContent>
    </Card>
  );
}

let useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: '20rem',
      // '&:hover': {
      //   box-shadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      // },
    '&::after': {
      content: '""',
      position: 'absolute',
      zIndex: 1,
      bottom: 0,
      left: 0,
      backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255, 1) 90%)',
      width: '100%',
      height: '4em',
      pointerEvents: 'none',
    }
  },
  rootExpanded: {
    position: 'relative',
    minHeight: '20rem',
    height: 'auto'
  }
}));

export default DayCard;