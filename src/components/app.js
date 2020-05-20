import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './home';
import WidgetCreator from './widget-creator';
function App() {
  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/widget-creator'>
        <WidgetCreator />
      </Route>
    </Switch>
  );
}

export default App;
