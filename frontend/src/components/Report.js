import React from 'react';
import { List } from 'semantic-ui-react';
import Rating from '@material-ui/lab/Rating';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';

export const Report = ({ report }) => {
  return (
    <List>
      {report.map(day => {
        let happiness = null;
        if (day.happiness)
          happiness = <Rating max={5}
            name={'happiness' + day.date_str}
            value={day.happiness} readOnly />;
        return (
          <List.Item key={day.date_str}>
            <Card>
              <CardContent>
                <Typography variant="h3">{day.date_str}</Typography>
                {happiness}
                <List>
                  <Typography variant="h6">Lesson</Typography>
                  <Typography variant="body1" gutterBottom>{day.lesson}</Typography>
                </List>
                <List>
                  <Typography variant="h6">Recap</Typography>
                  <Typography variant="body1" gutterBottom>{day.recap}</Typography>
                </List>
                Place:{day.place}
                Social:{day.social}
                Workout:{day.workout}
                Study:{day.study}
                Culture:{day.culture}
                Work:{day.work}
              </CardContent>
            </Card>
          </List.Item>
        )
      })
      }
    </List>
  )
}