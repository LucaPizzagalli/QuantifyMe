import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import CircularProgress from '@material-ui/core/CircularProgress';

function HappinessPlot() {
  let [data, setData] = useState(null);
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setData({
      date: [1, 2, 3, 4, 6, 7, 8],
      happiness: [1, 3, 4, 4, 3, 2, 3]
    });
    setIsLoading(false);
  }, []);

  let output = <CircularProgress />;
  if (!isLoading)
    output = <Plot
      style={{ width: '100%' }}
      data={[
        {
          x: data['date'],
          y: data['happiness'],
          type: 'scatter',
          mode: 'lines+markers',
          connectgaps: false,
        },
      ]}
      layout={{
        height: '650',
        title: 'Example',
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
