import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class Countdown extends Component {
  constructor(props) {
    super(props);
    this.state = { 'endTime': null, 'countDown': -1 };
    this.startTimer = this.startTimer.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  startTimer() {
    let lifespan = 10;
    this.setState({ 'endTime': new Date(new Date().getTime() + lifespan * 1000) , 'countDown': lifespan});
    this.interval = setInterval(() => {
      let countDown = (Date.parse(new Date(this.state.endTime)) - Date.parse(new Date())) / 1000;
      if (countDown < 0){
        clearInterval(this.interval);
        let audio = new Audio('/media/gong.wav');
        audio.play();
      }
      this.setState({ 'countDown': countDown });
    }, 1000);
  }

  stop() {
    clearInterval(this.interval);
  }

  render() {
    let output = null;
    if (this.state.countDown >= 0) {
      output = <p>{this.state.countDown}</p>;
    }
    else {
      output = <Button variant='contained' color='primary'
        onClick={this.startTimer} >
        submit
      </Button>
    }

    return (
      output
    );
  }
}

export default Countdown;