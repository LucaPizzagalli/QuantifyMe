import React, { useState, useContext, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Highcharts from 'highcharts'
import HC_more from 'highcharts/highcharts-more'
import HighchartsReact from 'highcharts-react-official';
import UserContext from '../Firebase';
HC_more(Highcharts)


function TimeSeriesPlot({ metrics }) {
  let user = useContext(UserContext);
  let theme = useTheme();
  let [timeSeries, setTimeSeries] = useState(null);
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    user.getTimeSeries(metrics, HandleGetDataSuccess, HandleGetDataError);
    Highcharts.setOptions(darkPlot(theme));
  }, [user, metrics]);

  function HandleGetDataSuccess(newTimeSeries) {
    for (let index = 0; index < newTimeSeries.length; index++)
      newTimeSeries[index]['yAxis'] = index;
    setTimeSeries(newTimeSeries);
    setIsLoading(false);
  }

  function HandleGetDataError(e) {
    setIsLoading(e.message);
  }

  if (isLoading === true)
    return <CircularProgress />;
  if (isLoading)
    return (
      <Alert severity="error">
        <AlertTitle>Error while retrieving data</AlertTitle>
        {isLoading}
      </Alert>
    );

  let options = {
    xAxis: {
      type: 'datetime',
    },
    yAxis: timeSeries.map(() => {
      return {
        lineWidth: 0,
        tickWidth: 0,
        gridLineWidth: 0,
        labels: { enabled: false },
        title: { text: '', }
      };
    }),
    // options['yAxis'][0]['gridLineWidth'] = 1;
    tooltip: { shared: true },
    series: timeSeries,
  }

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  );
}


function DependencyPlot({ metricX, metricY, metricColor }) {
  let user = useContext(UserContext);
  let theme = useTheme();
  let [data, setData] = useState(null);
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let metrics = [metricX, metricY];
    if (metricColor)
      metrics.push(metricColor)
    user.getTimeSeries(metrics, HandleGetDataSuccess, HandleGetDataError);
    Highcharts.setOptions(darkPlot(theme));
  }, [user, metricX, metricY, metricColor]);

  function HandleGetDataSuccess(timeSeries) {
    let dataX = timeSeries[0].data;
    let dataY = timeSeries[1].data;
    let points = new Map()
    let indexY = 0;
    for (let indexX = 0; indexX < dataX.length; indexX++) {
      while (dataX[indexX][0] > dataY[indexY][0] && indexY < dataY.length)
        indexY++;
      if (dataX[indexX][0] === dataY[indexY][0]) {
        let x = dataX[indexX][1];
        let y = dataY[indexY][1];
        if (points.has(x)) {
          if (points.get(x).has(y))
            points.get(x).set(y, points.get(x).get(y) + 1);
          else
            points.get(x).set(y, 1);
        }
        else
          points.set(x, new Map([[y, 1]]));
      }
    }
    let newData = []
    for (let [x, value] of points)
      for (let [y, z] of value)
        newData.push({ x: x, y: y, z: z })
    // if (timeSeries.length === 3)
    //   setColor(timeSeries[2]);
    setData(newData);
    setIsLoading(false);
  }

  function HandleGetDataError(e) {
    setIsLoading(e.message);
  }

  if (isLoading === true)
    return <CircularProgress />;
  if (isLoading)
    return (
      <Alert severity="error">
        <AlertTitle>Error while retrieving data</AlertTitle>
        {isLoading}
      </Alert>
    );

  let options = {
    chart: {
      type: 'bubble',
    },
    series: [{ data: data }],
    xAxis: {
      title: { text: metricX.name },
    },
    yAxis: {
      title: { text: metricY.name },
    },
    plotOptions: {
      bubble: {
        minSize: 8, // 8 * sqrt(max(data.z))
        maxSize: 8,
      },
    },
    legend: { enabled: false },
  }

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div >
  );
}

function darkPlot(theme) {
  return {
    // colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
    colors: [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.info.main,
      theme.palette.warning.main,
      theme.palette.error.main,
    ],
    chart: {
      backgroundColor: theme.palette.background.paper,
      style: {
        fontFamily: theme.typography.fontFamily,
      },
    },
    title: { text: '' },
    xAxis: {
      lineWidth: 1,
      lineColor: theme.palette.text.secondary,
      tickWidth: 1,
      tickLength: 6,
      tickColor: theme.palette.text.secondary,
      gridLineWidth: 0,
      labels: {
        style: {
          color: theme.palette.text.primary
        }
      },
      title: {
        style: {
          color: theme.palette.text.primary
        }
      }
    },
    yAxis: {
      lineWidth: 1,
      lineColor: theme.palette.text.secondary,
      tickWidth: 1,
      tickLength: 6,
      tickColor: theme.palette.text.secondary,
      gridLineWidth: 0,
      labels: {
        style: {
          color: theme.palette.text.primary
        }
      },
      title: {
        style: {
          color: theme.palette.text.primary
        }
      }
    },
    tooltip: {
      shape: 'square',
      backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      borderRadius: 10,
      borderWidth: 0,
      style: {
        color:theme.palette.text.primary,
      }
    },
    legend: {
      itemStyle: {
        color: theme.palette.text.primary,
      },
      itemHoverStyle: {
        color: 'gray'
      }
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      series: {
        marker: {
          symbol: 'circle'
        }
      },
    },
  }
};

let old_dark = {
  xAxis: {
    minorGridLineColor: '#505053',
  },
  yAxis: {
    minorGridLineColor: '#505053',
  },
  plotOptions: {
    series: {
      dataLabels: {
        color: '#B0B0B3'
      },
      marker: {
        lineColor: '#333'
      }
    },
  },
  legend: {
    itemStyle: {
      color: '#E0E0E3'
    },
    itemHoverStyle: {
      color: '#FFF'
    },
    itemHiddenStyle: {
      color: '#606063'
    }
  },
  labels: {
    style: {
      color: '#707073'
    }
  },

  navigation: {
    buttonOptions: {
      symbolStroke: '#DDDDDD',
      theme: {
        fill: '#505053'
      }
    }
  },

  // scroll charts
  rangeSelector: {
    buttonTheme: {
      fill: '#505053',
      stroke: '#000000',
      style: {
        color: '#CCC'
      },
      states: {
        hover: {
          fill: '#707073',
          stroke: '#000000',
          style: {
            color: 'white'
          }
        },
        select: {
          fill: '#000003',
          stroke: '#000000',
          style: {
            color: 'white'
          }
        }
      }
    },
    inputBoxBorderColor: '#505053',
    inputStyle: {
      backgroundColor: '#333',
      color: 'silver'
    },
    labelStyle: {
      color: 'silver'
    }
  },

  navigator: {
    handles: {
      backgroundColor: '#666',
      borderColor: '#AAA'
    },
    outlineColor: '#CCC',
    maskFill: 'rgba(255,255,255,0.1)',
    series: {
      color: '#7798BF',
      lineColor: '#A6C7ED'
    },
    xAxis: {
      gridLineColor: '#505053'
    }
  },

  scrollbar: {
    barBackgroundColor: '#808083',
    barBorderColor: '#808083',
    buttonArrowColor: '#CCC',
    buttonBackgroundColor: '#606063',
    buttonBorderColor: '#606063',
    rifleColor: '#FFF',
    trackBackgroundColor: '#404043',
    trackBorderColor: '#404043'
  },

  // special colors for some of the
  legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
  background2: '#505053',
  dataLabelsColor: '#B0B0B3',
  textColor: '#C0C0C0',
  contrastTextColor: '#F0F0F3',
  maskColor: 'rgba(255,255,255,0.3)'
};


export { TimeSeriesPlot, DependencyPlot }
