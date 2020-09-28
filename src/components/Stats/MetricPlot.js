import React, { useState, useContext, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import UserContext from '../Firebase';


function MetricPlot({ metrics }) {
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

  let options = {};
  if (user.info.theme === 'dark')
    options = darkPlot;
  else
    options = lightPlot;

  options['title']['text'] = '';
  options['xAxis']['type'] = 'datetime';
  options['yAxis'] = timeSeries.map(() => {
    return {
      gridLineWidth: 0,
      labels: { enabled: false },
      title: { text: '', }}
    });
  options['yAxis'][0]['gridLineWidth'] = 1;
  options['series'] = timeSeries;

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  );
}

let darkPlot = {
  colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
    '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
  chart: {
    backgroundColor: {
      linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
      stops: [
        [0, '#2a2a2b'],
        [1, '#3e3e40']
      ]
    },
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
  // yAxis: {
  //   gridLineColor: '#707073',
  //   labels: {
  //     style: {
  //       color: '#E0E0E3'
  //     }
  //   },
  //   lineColor: '#707073',
  //   minorGridLineColor: '#505053',
  //   tickColor: '#707073',
  //   tickWidth: 1,
  //   title: {
  //     style: {
  //       color: '#A0A0A3'
  //     }
  //   }
  // },
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

export default MetricPlot