import React, { useState, useContext, useEffect } from 'react';
import Plot from 'react-plotly.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import UserContext from '../components/Firebase';
import AlertContext from '../components/Header';

function HappinessPlot() {
  let user = useContext(UserContext);
  let showAlert = useContext(AlertContext);
  let [data, setData] = useState(null);
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    user.getDb().collection('stats').doc('id0').get()
      .then((doc) => {
        let dates = [];
        let values = [];
        for (let [date, value] of Object.entries(doc.data().data)) {
          dates.push(date);
          values.push(value);
        }
        setData({
          date: dates,
          happiness: values
        });
        setIsLoading(false);
      })
      .catch((e) => {
        showAlert(e.message, 'error');
      })
  }, [user, showAlert]);

  let output = <CircularProgress />;
  if (!isLoading)
    output = <Plot
      style={{ width: '100%' }}
      data={[
        {
          x: data['date'],
          y: data['happiness'],
          transforms: [{
            type: 'sort',
            target: 'x',
            order: 'ascending'
          }],
          type: 'scatter',
          mode: 'lines+markers',
          connectgaps: false,
        },
      ]}
      layout={{
        height: '650',
        title: 'Example',
        margin: {l:20, r:20, t:40, b:20},
        yaxis: {'zeroline': false}
      }}
      config={{
        showTips: false,
        modeBarButtonsToRemove: ['select2d', 'lasso2d', 'resetScale2d', 'toggleSpikelines'],
        displaylogo: false,
      }}
    />;
  return (output);
}

export default HappinessPlot
