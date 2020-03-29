import React from 'react';
import Plot from 'react-plotly.js';
import CircularProgress from '@material-ui/core/CircularProgress';

class HappinessPlot extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 'happiness_data': 'loading' }
    fetch('/get_happiness').then(response => response.json().then(data => {
      this.setState({ 'happiness_data': data });
    }));
  }

  render() {
    let output = <CircularProgress />;
    if (this.state.happiness_data !== 'loading')
      output = <Plot
        style={{ width: '100%' }}
        data={[
          {
            x: this.state.happiness_data['date'],
            y: this.state.happiness_data['happiness'],
            type: 'scatter',
            mode: 'lines+markers',
            connectgaps: false,
          },
        ]}
        layout = {{
          height: '650',
          title: 'Happyness',
        }}
      />;
    return (output);
  }
}

export default HappinessPlot
