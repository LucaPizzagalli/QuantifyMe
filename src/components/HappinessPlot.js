import React, { useState, useContext, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import UserContext from '../components/Firebase';
import AlertContext from './Layout';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function HappinessPlot() {
  let user = useContext(UserContext);
  let showAlert = useContext(AlertContext);
  let [data, setData] = useState(null);
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    user.getDb().collection('stats').doc('id0').get()
      .then((doc) => {
        let newData = doc.data().data.map(tuple => [tuple['date'], tuple['value']]);
        setData(newData);
        setIsLoading(false);
      })
      .catch((e) => {
        showAlert(e.message, 'error');
      })
  }, [user, showAlert]);

  if (isLoading)
    return <CircularProgress />;

  let options = {
    title: {
      text: 'My chart'
    },
    xAxis: {
      type: 'datetime'
    },
    series: [{
      data: data
    }]
  };
  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  );
}

export default HappinessPlot
