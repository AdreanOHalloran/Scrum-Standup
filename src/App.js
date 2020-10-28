import React, { setState } from 'react';
import './App.css';
import { Stopwatch } from './components/Stopwatch';
import { ScrumList } from './components/ScrumList';

function App() {
  // need to use a useEffect to get the list of items in backend in the list.
  // Get a fresh list from the backend
  // Randomize the order
  // Add / Remove people permanently

  return (
    <div className="container">
      <Stopwatch />
      <ScrumList />
    </div>
  );
}

export default App;
