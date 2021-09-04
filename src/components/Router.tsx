import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import authService from 'fbase';
import Auth from '../routes/Auth';

import Navigation from './Navigation';
import Home from '../routes/Home';
import Profile from 'components/Profile';

interface Props {
  isLoggedIn: authService.User | null;
}
const AppRouter = ({ isLoggedIn }: Props) => {
  return (
    <Router>
      {/* 로그인페이지에서는 네비게이션이 보일 필요 없으니 isLoggeIn에 의존한다 */}
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
