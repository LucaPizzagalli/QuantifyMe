import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'typeface-roboto'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Stats from './pages/Stats';
import Stimulator from './pages/Stimulator';
import AppMenu from './components/AppMenu';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 'timerEndTime': null, 'timerCountDown': -1 };
    // this.startTimer = this.startTimer.bind(this);
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Router>
          <AppMenu />
          <Switch>
            <Route path='/stats'>
              <Stats />
            </Route>
            <Route path='/stimulator'>
              <Stimulator />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}
export default App;