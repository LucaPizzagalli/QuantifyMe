import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 'plot_loaded': 0 }
    fetch('/get_happines_plot').then(response => response.json().then(data => {
      this.setState({ 'happiness_plot_div': data.plot_div, 'happiness_plot_js': data.plot_js, 'plot_loaded': 1 });
      this.plotta()
    }));
  }

  plotta() {
    const script = document.createElement("script");
    script.type = 'text/javascript';
    script.src = "https://cdn.plot.ly/plotly-latest.min.js";
    script.async = true;
    console.log(this.state.plot_loaded);
    script.addEventListener('load', () => {
      this.setState({ 'plot_loaded': 2 })
      // eval(this.state.happiness_plot_js);
    });
    document.body.appendChild(script);
  }

  render() {
    return (
      <div>
        {
          this.state.plot_loaded === 2 ?
            <div>
              <div dangerouslySetInnerHTML={{ __html: this.state.happiness_plot_div }} />
              <script dangerouslySetInnerHTML={{ __html: 'alert(33)' }} />
            </div> : <CircularProgress/>
        }
        {/* <div dangerouslySetInnerHTML={{ __html: '<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>' + this.state.happiness_plot }} /> */}
      </div>
    );
  }
}

export default Stats