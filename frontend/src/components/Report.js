import React from 'react';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class Report extends React.Component {

  render() {
    let output = <div>Loading</div>;
    if (this.props.legend !== 'loading') {
      let days = [];
      for (let day of this.props.report) {
        let happiness = null;
        if (day.happiness)
          happiness = <Rating max={5} name={'happiness' + day.date} value={day.happiness} size="large" readOnly />;
        let fields = []
        for (let field of this.props.legend.order.slice(2))
          if (day[field]) {
            if (this.props.legend.legend[field].rating.length > 0)
              fields.push(
                <Box key={field + day.date} display="flex">
                  <Typography variant="body1"><strong>{field[0].toUpperCase() + field.slice(1)}</strong></Typography>
                  <Rating max={this.props.legend.legend[field].rating.length}
                    name={field + day.date} value={day[field].rating} readOnly />
                </Box>);
            else
              fields.push(
                <div key={field}>
                  <Typography variant="body1"><strong>{field[0].toUpperCase() + field.slice(1)} </strong>{day[field]}</Typography>
                </div>);
          }
        days.push(
          <Grid item key={day.date} xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h3">{day.date}</Typography>
                {happiness}
                {fields}
              </CardContent>
            </Card>
          </Grid>);
      }
      output = <Grid container spacing={3} justify='center'>{days}</Grid>;
    }
    return (output);
  }
}

export default Report