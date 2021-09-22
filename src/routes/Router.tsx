import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Auth from "./Auth";
import Navigation from "../components/Navigation";
import Home from "./Home";
import Profile from "components/Profile";
// import { customHistory } from "store/store";

interface Props {
  isLoggedIn: boolean;

  refreshUser: () => void;
}
const AppRouter = ({ isLoggedIn, refreshUser }: Props) => {
  return (
    <Router>
      {/* 로그인페이지에서는 네비게이션이 보일 필요 없으니 isLoggeIn에 의존한다 */}
      {isLoggedIn && <Navigation />}

      {isLoggedIn ? (
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/profile">
            <Profile refreshUser={refreshUser} />
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
