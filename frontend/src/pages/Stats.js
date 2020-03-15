import React from 'react';
import { Container } from 'semantic-ui-react';

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
        <Container>
          {
            this.state.plot_loaded === 2 ? 
            <div>
            <div dangerouslySetInnerHTML={{ __html: this.state.happiness_plot_div }} />
            <script dangerouslySetInnerHTML={{ __html: 'alert(33)' }} />
            </div> : <div>Loading...</div>
          }
          {/* <div dangerouslySetInnerHTML={{ __html: '<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>' + this.state.happiness_plot }} /> */}
        </Container>
      </div>
    );
  }
}

export default Stats