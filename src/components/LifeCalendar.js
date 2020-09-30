import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Hidden from '@material-ui/core/Hidden';

function LifeCalendar() {
  let lifeLength = 90;
  let birthday = new Date('1993-08-12');
  birthday.setDate(birthday.getDate() - (birthday.getDay() + 6) % 7);

  let classes = useStyles();
  let today = new Date();
  today.setDate(today.getDate() - 7);
  let deathday = new Date(birthday.getTime());
  deathday.setFullYear(birthday.getFullYear() + lifeLength);
  let birthdayPosition = birthday.getMonth() * 100 + birthday.getDate();

  let day = new Date(birthday.getTime());
  let isLater = true;
  let header = [<div className={classes.cellShell} key={'calendar_header_empty'}><div className={classes.cell}></div></div>];
  for (let j = 1; j <= 53; j++)
    header.push(<div className={classes.cellShell} key={'calendar_header_' + j}><div className={classes.outCell}>{j}</div></div>);
  header = <Hidden mdDown><div className={classes.row} key={'calendar_header'}>{header}</div></Hidden>;

  let now = true;
  let years = [];
  let weeks = [<Hidden key="year_number_0" mdDown><div className={classes.cellShell}><div className={classes.outCell}>0</div></div></Hidden>];
  while (day < deathday) {
    let position = day.getMonth() * 100 + day.getDate();
    if (!isLater && position >= birthdayPosition) {
      if (weeks.length < 54)
        weeks.push(<div className={classes.cellShell} key={'empty_' + years.length}></div>);
      years.push(<div className={classes.row} key={'year_' + years.length}>{weeks}</div>)
      weeks = [<Hidden key={'year_number_' + years.length} mdDown><div className={classes.cellShell}><div className={classes.outCell}>{years.length}</div></div></Hidden>];
    }
    isLater = position >= birthdayPosition;
    let type = 'forgotten';
    if (day > today) {
      type = 'future';
      if (now)
        type = 'now';
      now = false;
    }
    weeks.push(<WeekCell key={day} day={day} type={type} />);
    day = new Date(day.getTime());
    day.setDate(day.getDate() + 7);
  }
  return (
    <>
      <div className={classes.root}>
        {header}
        {years}
      </div>
      <Typography>
        Inspired by {' '}
        <Link href="https://waitbutwhy.com/2014/05/life-weeks.html">
          waitbutwhy.com
        </Link>
      </Typography>
    </>
  );
}

function WeekCell({ day, type }) {
  let [isHovered, setIsHovered] = useState(false);
  let [isClicked, setIsClicked] = useState(false);
  let [color] = useState(Math.floor(Math.random() * 26));

  let classes = useStyles();
  if (isClicked) {
    let endWeek = new Date(day.getTime());
    endWeek.setDate(day.getDate() + 6)
    return (
      <div className={classes.cellShell} ><div className={classes.cell} >
        <Paper
          className={classes.clickedCell}
          onMouseLeave={() => { setIsHovered(false); setIsClicked(false); }}
          onClick={() => setIsClicked(false)} >
          <Typography>
            {day.toISOString().slice(0, 10)}
          </Typography>
          <Typography>
            {endWeek.toISOString().slice(0, 10)}
          </Typography>
        </Paper>
      </div></div>
    );
  }
  let style = null;
  if (isHovered)
    style = { backgroundColor: 'red', };
  else if (type === 'forgotten')
    style = { backgroundColor: 'rgb(' + (190 + color) + ', ' + (190 + color) + ', ' + (200 + color) + ')', };
  else if (type === 'future')
    style = { backgroundColor: 'rgb(' + (170 + color) + ', 212, 218)', };
  else if (type === 'now')
    style = { backgroundColor: 'yellow', };
  return (
    <div className={classes.cellShell}>
      <div
        className={classes.cell} style={style}
        onClick={() => setIsClicked(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)} ></div>
    </div>
  );
}

let useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  cellShell: {
    flexBasis: 0,
    flexGrow: 1,
    border: '1px solid',
    borderColor: theme.palette.background.default,
  },
  cell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '100%',
  },
  outCell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clickedCell: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    padding: '1rem',
  },
}));

export default LifeCalendar;