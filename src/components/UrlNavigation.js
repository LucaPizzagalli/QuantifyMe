import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NotFound from '../pages/404';
import Loading from '../pages/loading';
import Home from '../pages/home';
import SignUpPage from '../pages/sign-up';
import SignInPage from '../pages/sign-in';
import ResetPasswordPage from '../pages/reset-password';
import AccountPage from '../pages/account';
import MetricsPage from '../pages/metrics';
import QuantifyDayPage from '../pages/quantify-day';
import DiaryPage from '../pages/diary';
import Stats from '../pages/stats';
import Stimulator from '../pages/stimulator';
import UserContext from './Firebase';
import { Header } from './Header';

function UrlNavigation() {
  let user = useContext(UserContext);
  if (user.isLogged())
    return (
      <Router>
        <Header>
          <Switch>
            <Route path='/account'> <AccountPage /> </Route>
            <Route path='/metrics'> <MetricsPage /> </Route>
            <Route path='/quantify-day'> <QuantifyDayPage /> </Route>
            <Route path='/diary'> <DiaryPage /> </Route>
            <Route path='/stats'> <Stats /> </Route>
            <Route path='/stimulator'> <Stimulator /> </Route>
            <Route path='/sign-up'> <Home /> </Route>
            <Route path='/sign-in'> <Home /> </Route>
            <Route path='/reset-password'> <Home /> </Route>
            <Route exact path='/'> <Home /> </Route>
            <Route path=''> <NotFound /> </Route>
          </Switch>
        </Header>
      </Router>
    );
  if (user.auth === 0)
    return (
      <Router>
        <Header >
          <Switch>
            <Route path=''> <Loading /> </Route>
          </Switch>
        </Header>
      </Router>
    );
  return (
    <Router>
      <Header>
        <Switch>
          <Route path='/sign-up'> <SignUpPage /> </Route>
          <Route path='/sign-in'> <SignInPage /> </Route>
          <Route path='/reset-password'> <ResetPasswordPage /> </Route>
          <Route exact path='/'> <Home /> </Route>
          <Route path=''> <NotFound /> </Route>
        </Switch>
      </Header>
    </Router>
  );
}

export default UrlNavigation;