import React from 'react';
import { Route, Switch } from 'react-router-dom';
import WidgetCreator from './widget-creator';
import Widget from './widget.js';
import GlobalStyles from './global-styles';
function App() {
  return (
    <>
      <GlobalStyles />
      <Switch>
        <Route exact path='/'>
          <WidgetCreator />
        </Route>
        <Route path='/widget/:id' component={Widget} />
      </Switch>
    </>
  );
}

export default App;
