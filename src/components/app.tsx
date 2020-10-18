import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import GlobalStyles from './global-styles';
const WidgetCreator = lazy(() => import('./widget-creator'));
const Widget = lazy(() => import('./widget'));
const NotFound = lazy(() => import('./not-found'));

function App() {
  return (
    <Suspense fallback={<p>Loading page...</p>}>
      <GlobalStyles />
      <Switch>
        <Route exact path='/'>
          <WidgetCreator />
        </Route>
        <Route path='/widget/:id' component={Widget} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

export default App;
