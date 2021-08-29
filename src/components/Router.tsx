import React, { useState } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';

const AppRouter = () => {
  const [isLoggeIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <Switch>
        {isLoggeIn ? (
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
