import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import UserContext from './Firebase';
import { Link as RouterLink } from 'react-router-dom';

function Dashboard() {
  let user = useContext(UserContext);
  let [cardInfos, setCardInfos] = useState(user.getDashboardCards());

  function HandleDismissInfo(index){
    let newCardInfos = [...cardInfos];
    newCardInfos.splice(index, 1);
    setCardInfos(newCardInfos);
  }

  let classes = useStyles();
  return (
    <Grid container spacing={3} style={{ marginTop: '1rem' }}>
      {cardInfos.map((cardInfo, index) => {
        let content =
          <div className={classes.root}>
            <Typography variant="h5" component="h2" className={classes.title}>
              {cardInfo.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {cardInfo.message}
            </Typography>
          </div>;
        return (
          <Grid key={index} item xs={12} md={6} xl={4}>
            <Paper className={classes.card}>
              {cardInfo.to ? <CardActionArea component={RouterLink} to={cardInfo.to}>{content}</CardActionArea> : content}
              <IconButton aria-label="dismiss" onClick={() => HandleDismissInfo(index)} className={classes.dismiss}>
                <ClearIcon />
              </IconButton>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
}

let useStyles = makeStyles(theme => ({
  card: {
    width: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  root: {
    padding: theme.spacing(2, 2, 2, 2),
  },
  title: {
    margin: theme.spacing(0, 0, 4, 0),
  },
  dismiss: {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
  },
}));

export default Dashboard