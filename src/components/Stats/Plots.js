import React, { useState, useContext, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Highcharts from 'highcharts'
import HC_more from 'highcharts/highcharts-more'
import HighchartsReact from 'highcharts-react-official';
import UserContext from '../Firebase';
HC_more(Highcharts)

Highcharts.theme = {
  colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
    '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
  chart: {
    backgroundColor: '#2A2A2A',
  },
  xAxis: {
    labels: {
      style: {
        color: '#E0E0E3'
      }
    },
    lineColor: '#707073',
    tickColor: '#707073',
    title: {
      style: {
        color: '#A0A0A3'

      }
    }
  },
  yAxis: {
    labels: {
      style: {
        color: '#E0E0E3'
      }
    },
    lineColor: '#707073',
    gridLineWidth: 0,
    tickColor: '#707073',
    tickWidth: 1,
    title: {
      style: {
        color: '#A0A0A3'
      }
    }
  },

  legend: {
    itemStyle: {
      font: '9pt Trebuchet MS, Verdana, sans-serif',
      color: 'black'
    },
    itemHoverStyle: {
      color: 'gray'
    }
  }
};
Highcharts.setOptions(Highcharts.theme);

function TimeSeriesPlot({ metrics }) {
  let user = useContext(UserContext);
  let [timeSeries, setTimeSeries] = useState(null);
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    user.getTimeSeries(metrics, HandleGetDataSuccess, HandleGetDataError);
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

  // let options = {};
  // if (user.info.theme === 'dark')
  //   options = darkPlot;
  // else
  //   options = lightPlot;

  let options = {
    title: {
      text: ''
    },
    xAxis: {
      type: 'datetime',
    },
    yAxis: timeSeries.map(() => {
      return {
        gridLineWidth: 0,
        labels: { enabled: false },
        title: { text: '', }
      }
    }),
    // options['yAxis'][0]['gridLineWidth'] = 1;
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
  let [data, setData] = useState(null);
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let metrics = [metricX, metricY];
    if (metricColor)
      metrics.push(metricColor)
    user.getTimeSeries(metrics, HandleGetDataSuccess, HandleGetDataError);
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

  // let options = {};
  // if (user.info.theme === 'dark')
  //   options = darkPlot;
  // else
  //   options = lightPlot;

  let options = {
    title: {
      text: '',
    },
    chart: {
      type: 'bubble',
    },
    series: [{ data: data }],
    xAxis: {
      title: {
        text: 'testo x',
      },
    },
    plotOptions: {
      bubble: {
        minSize: 8,
        maxSize: 8,
      },
    },
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

// accessibility: {
//     point: {
//         valueDescriptionFormat: '{index}. {point.name}, fat: {point.x}g, sugar: {point.y}g, obesity: {point.z}%.'
//     }
// },

// plotLines: [{
//     color: 'black',
//     dashStyle: 'dot',
//     width: 2,
//     value: 65,
//     label: {
//         rotation: 0,
//         y: 15,
//         style: {
//             fontStyle: 'italic'
//         },
//         text: 'Safe fat intake 65g/day'
//     },
//     zIndex: 3
// }],

// tooltip: {
//     useHTML: true,
//     headerFormat: '<table>',
//     pointFormat: '<tr><th colspan="2"><h3>{point.country}</h3></th></tr>' +
//         '<tr><th>Fat intake:</th><td>{point.x}g</td></tr>' +
//         '<tr><th>Sugar intake:</th><td>{point.y}g</td></tr>' +
//         '<tr><th>Obesity (adults):</th><td>{point.z}%</td></tr>',
//     footerFormat: '</table>',
//     followPointer: true
// },

let darkPlot = {
  chart: {
    style: {
      fontFamily: '\'Unica One\', sans-serif'
    },
    plotBorderColor: '#606063'
  },
  title: {
    style: {
      color: '#E0E0E3',
      textTransform: 'uppercase',
      fontSize: '20px'
    }
  },
  subtitle: {
    style: {
      color: '#E0E0E3',
      textTransform: 'uppercase'
    }
  },
  xAxis: {
    gridLineColor: '#707073',
    labels: {
      style: {
        color: '#E0E0E3'
      }
    },
    lineColor: '#707073',
    minorGridLineColor: '#505053',
    tickColor: '#707073',
    title: {
      style: {
        color: '#A0A0A3'

      }
    }
  },
  yAxis: {
    gridLineColor: '#707073',
    labels: {
      style: {
        color: '#E0E0E3'
      }
    },
    lineColor: '#707073',
    minorGridLineColor: '#505053',
    tickColor: '#707073',
    tickWidth: 1,
    title: {
      style: {
        color: '#A0A0A3'
      }
    }
  },
  tooltip: {
    shared: true,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    style: {
      color: '#F0F0F0'
    }
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
    boxplot: {
      fillColor: '#505053'
    },
    candlestick: {
      lineColor: 'white'
    },
    errorbar: {
      color: 'white'
    }
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
  credits: {
    style: {
      color: '#666'
    }
  },
  labels: {
    style: {
      color: '#707073'
    }
  },

  drilldown: {
    activeAxisLabelStyle: {
      color: '#F0F0F3'
    },
    activeDataLabelStyle: {
      color: '#F0F0F3'
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

let lightPlot = {
  colors: ['#7cb5ec', '#f7a35c', '#90ee7e', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
    '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
  chart: {
    backgroundColor: null,
    style: {
      fontFamily: 'Dosis, sans-serif'
    }
  },
  title: {
    style: {
      fontSize: '16px',
      fontWeight: 'bold',
      textTransform: 'uppercase'
    }
  },
  tooltip: {
    borderWidth: 0,
    backgroundColor: 'rgba(219,219,216,0.8)',
    shared: true,
    shadow: false
  },
  legend: {
    itemStyle: {
      fontWeight: 'bold',
      fontSize: '13px'
    }
  },
  xAxis: {
    gridLineWidth: 1,
    labels: {
      style: {
        fontSize: '12px'
      }
    }
  },
  yAxis: {
    minorTickInterval: 'auto',
    title: {
      style: {
        textTransform: 'uppercase'
      }
    },
    labels: {
      style: {
        fontSize: '12px'
      }
    }
  },
  plotOptions: {
    candlestick: {
      lineColor: '#404048'
    }
  },
  background2: '#F0F0EA'
};

export { TimeSeriesPlot, DependencyPlot }
