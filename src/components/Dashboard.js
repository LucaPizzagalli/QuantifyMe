import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import UserContext from './Firebase';
import { Link as RouterLink } from 'react-router-dom';

function Dashboard() {
  let user = useContext(UserContext);
  let [cardInfos, _] = useState(user.getDashboardCards());

  let classes = useStyles();
  return (
    <Grid container spacing={3} style={{ marginTop: '1rem' }}>
      {cardInfos.map((cardInfo, index) => {
        let content =
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {cardInfo.message}
            </Typography>
          </CardContent>;
        let header =
          <CardHeader
            action={
              <IconButton aria-label="dismiss">
                <ClearIcon />
              </IconButton>
            }
            title={cardInfo.title}
          />;
        let card = null;
        if (cardInfo.to)
          card =
            <Card><CardActionArea component={RouterLink} to={cardInfo.to}>
              {header}{content}
            </CardActionArea></Card>;
        else
          card =
            <Card>
              {header}{content}
            </Card>;
        return (
          <Grid key={index} item xs={12} md={6} xl={4}>
            {card}
          </Grid>
        )
      })}
    </Grid>
  );
}

let useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

export default Dashboard