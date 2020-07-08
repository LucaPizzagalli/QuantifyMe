import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

function MetricsPage() {
  let lifeLength = 90;

  let classes = useStyles();
  let years = [];
  let weeks = [];
  weeks.push(<div className={classes.outCell}></div>);
  for (let j = 0; j < 52; j++) {
    weeks.push(<div className={classes.outCell}>{j}</div>);
  }
  weeks.push(<div className={classes.outCell}></div>);
  years.push(<div className={classes.row}>{weeks}</div>)
  for (let i = 0; i < lifeLength; i++) {
    let weeks = [];
    weeks.push(<div className={classes.outCell}>{i}</div>);
    for (let j = 0; j < 52; j++) {
      let color = 210 + Math.floor(Math.random() * 30);
      weeks.push(<div className={classes.cell} style={{ backgroundColor: 'rgb(' + color + ', ' + color + ', ' + color + ')', }}></div>);
    }
    weeks.push(<div className={classes.outCell}></div>);
    years.push(<div className={classes.row}>{weeks}</div>)
  }
  return (
    <>
      <div className={classes.root}>
        {years}
      </div>
    inspired by https://waitbutwhy.com/2014/05/life-weeks.html
    </>
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
  cell: {
    display: 'flex',
    alignItems: 'center',
    flexBasis: 0,
    flexGrow: 1,
    height: '2vw'
  },
  outCell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexBasis: 0,
    flexGrow: 1,
    height: '2vw'
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default MetricsPage;