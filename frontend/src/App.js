import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Stats from './pages/Stats';
import AppMenu from './components/AppMenu';

// import 'typeface-roboto';

function App() {
  return (
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
  );
}

export default App;
