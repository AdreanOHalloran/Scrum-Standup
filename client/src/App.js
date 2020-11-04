import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AddRemoveForm } from './components/AddRemoveForm';
import { DailyScrumPage } from './components/DailyScrumPage';

const App = () => {
  // TODO: Should do the useEffect in App and pass to components?
  // TODO: If person is active and the close button is pressed. The timer should restart.
  // TODO: Clicking X should not call handleTMClick function.

  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path="/" component={DailyScrumPage} />
          <Route path="/add-remove-form" component={AddRemoveForm} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
