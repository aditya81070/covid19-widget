import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './home';
function App() {
  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
    </Switch>
  );
}

export default App;
