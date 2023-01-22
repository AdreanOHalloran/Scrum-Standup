import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AddRemoveForm } from './components/AddRemoveForm';
import { DailyScrumPage } from './components/DailyScrumPage';
import { WholeTeamList } from './components/WholeTeamList';
import { Header } from './components/Header';

const App = () => {
  return (
    <div
      className="container ml-3 my-3 "
      style={{
        maxWidth: '350px',
        backgroundColor: '#f7f9fc',
        borderRadius: '10px',
      }}
    >
      <Header />
      <Router>
        <Switch>
          <Route exact path="/" component={WholeTeamList} />
          <Route exact path="/add-remove-form" component={AddRemoveForm} />
          <Route exact path="/:teamId" component={DailyScrumPage} />
          <Route path="/add-remove-form/:teamId" component={AddRemoveForm} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
