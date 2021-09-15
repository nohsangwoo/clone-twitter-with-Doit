import React from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import authService from 'fbase';
import Auth from '../routes/Auth';
import Navigation from './Navigation';
import Home from '../routes/Home';
import Profile from 'components/Profile';

interface Props {
  isLoggedIn: authService.User | null;
  userObj: any;
}
const AppRouter = ({ isLoggedIn, userObj }: Props) => {
  return (
    <Router>
      {/* 로그인페이지에서는 네비게이션이 보일 필요 없으니 isLoggeIn에 의존한다 */}
      {isLoggedIn && <Navigation userObj={userObj} />}

      {isLoggedIn ? (
        <Switch>
          <Route exact path="/">
            <Home userObj={userObj} />
          </Route>
          <Route exact path="/profile">
            <Profile userObj={userObj} />
          </Route>
          <Redirect from="*" to="/" />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/">
            <Auth />
          </Route>
          <Redirect from="*" to="/" />
        </Switch>
      )}
      {/* 조건에서 걸러진 경우(위 조건별 path 이외의 상태) Redirect가 동작함 */}
    </Router>
  );
};

export default AppRouter;
