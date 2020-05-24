import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import GlobalStyles from './global-styles';

const WidgetCreator = lazy(() => import('./widget-creator'));
const Widget = lazy(() => import('./widget'));

function App() {
  return (
    <Suspense fallback={<p>Loading page...</p>}>
      <GlobalStyles />
      <Switch>
        <Route exact path='/'>
          <WidgetCreator />
        </Route>
        <Route path='/widget/:id' component={Widget} />
      </Switch>
    </Suspense>
  );
}

export default App;
