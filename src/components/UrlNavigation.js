import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NotFound from '../pages/404';
import Loading from '../pages/loading';
import DashboardPage from '../pages/dashboard';
import SignUpPage from '../pages/sign-up';
import SignInPage from '../pages/sign-in';
import ResetPasswordPage from '../pages/reset-password';
import SettingsPage from '../pages/settings';
import MetricsPage from '../pages/metrics';
import QuantifyDayPage from '../pages/quantify-day';
import DiaryPage from '../pages/diary';
import Stats from '../pages/stats';
import Stimulator from '../pages/stimulator';
import LifeCalendar from '../pages/life-calendar';
import UserContext from './Firebase';
import { Layout } from './Layout';

function UrlNavigation() {
  let user = useContext(UserContext);
  console.log(process.env.PUBLIC_URL)
  if (user.isLogged())
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Layout>
          <Switch>
            <Route path='/settings'> <SettingsPage /> </Route>
            <Route path='/metrics'> <MetricsPage /> </Route>
            <Route path='/quantify-day'> <QuantifyDayPage /> </Route>
            <Route path='/diary'> <DiaryPage /> </Route>
            <Route path='/stats'> <Stats /> </Route>
            <Route path='/stimulator'> <Stimulator /> </Route>
            <Route path='/life-calendar'> <LifeCalendar /> </Route>
            <Route path='/sign-up'> <DashboardPage /> </Route>
            <Route path='/sign-in'> <DashboardPage /> </Route>
            <Route path='/reset-password'> <DashboardPage /> </Route>
            <Route path='/dashboard'> <DashboardPage /> </Route>
            <Route exact path='/'> <DashboardPage /> </Route>
            <Route path=''> <NotFound /> </Route>
          </Switch>
        </Layout>
      </Router>
    );
  if (user.auth === 0)
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path=''> <Loading /> </Route>
        </Switch>
      </Router>
    );
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Layout>
        <Switch>
          <Route path='/sign-up'> <SignUpPage /> </Route>
          <Route path='/sign-in'> <SignInPage /> </Route>
          <Route path='/reset-password'> <ResetPasswordPage /> </Route>
          <Route path=''> <SignUpPage /> </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default UrlNavigation;
