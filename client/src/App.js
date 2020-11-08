import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AddRemoveForm } from './components/AddRemoveForm';
import { DailyScrumPage } from './components/DailyScrumPage';
import { Header } from './components/Header';

const App = () => {
  return (
    <div
      className="container ml-3 my-3 "
      style={{
        maxWidth: '375px',
        backgroundColor: '#f7f9fc',
        borderRadius: '10px',
      }}
    >
      <Header />
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
