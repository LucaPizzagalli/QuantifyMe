import React from 'react';
import { List, Header, Segment, Rating } from 'semantic-ui-react';

export const Report = ({ report }) => {
  return (
    <List>
      {report.map(day => {
        let happiness = null;
        if (day.happiness)
          happiness = <Rating defaultRating={day.happiness} maxRating={5} disabled />;
        return (
          <List.Item key={day.date_str}>
            <Segment>
              <Header>{day.date_str}</Header>
              {happiness}
              <List>
                <List.Header>Lesson:</List.Header>
                <List.Item>{day.lesson}</List.Item>
              </List>
              <List>
                <List.Header>Recap:</List.Header>
                <List.Item>{day.recap}</List.Item>
              </List>
              <List>
                <List.Header>Place:</List.Header>
                <List.Item>{day.place}</List.Item>
              </List>
              <List>
                <List.Header>Social:</List.Header>
                <List.Item>{day.social}</List.Item>
              </List>
              <List>
                <List.Header>Workout:</List.Header>
                <List.Item>{day.workout}</List.Item>
              </List>
              <List>
                <List.Header>Study:</List.Header>
                <List.Item>{day.study}</List.Item>
              </List>
              <List>
                <List.Header>Culture:</List.Header>
                <List.Item>{day.culture}</List.Item>
              </List>
              <List>
                <List.Header>Work:</List.Header>
                <List.Item>{day.work}</List.Item>
              </List>
            </Segment>
          </List.Item>
        )
      })
      }
    </List>
  )
}