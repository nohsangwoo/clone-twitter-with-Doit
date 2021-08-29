import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
interface Props {
  isLoggedIn: boolean;
}
const AppRouter = ({ isLoggedIn }: Props) => {
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <Route exact path="/">
            <Home />
          </Route>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
        <Route />
      </Switch>
    </Router>
  );
};

export default AppRouter;
