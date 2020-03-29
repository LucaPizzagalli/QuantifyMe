import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Stats from './pages/Stats';
import AppMenu from './components/AppMenu';

// import 'typeface-roboto';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <AppMenu />
        <Switch>
          <Route path="/stats">
            <Stats />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;