import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';

function DayCard({ metrics, day }) {

  return (
    <Card>
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

// let days = [];
// for (let day of report) {
//   let happiness = null;
//   if (day.happiness)
//     happiness = <Rating max={5} name={'happiness' + day.date} value={day.happiness} size='large' readOnly />;
//   let fields = []
//   for (let field of legend.order.slice(2))
//     if (day[field]) {
//       if (legend.legend[field].rating.length > 0)
//         fields.push(
//           <Box key={field + day.date} display='flex'>
//             <Typography variant='body1'><strong>{field[0].toUpperCase() + field.slice(1)}</strong></Typography>
//             <Rating max={legend.legend[field].rating.length}
//               name={field + day.date} value={day[field].rating} readOnly />
//           </Box>);
//       else
//         fields.push(
//           <div key={field}>
//             <Typography variant='body1'><strong>{field[0].toUpperCase() + field.slice(1)} </strong>{day[field]}</Typography>
//           </div>);
//     }

export default DayCard;