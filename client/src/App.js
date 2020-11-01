import React, { useState } from 'react';
import './App.css';
import { Stopwatch } from './components/Stopwatch';
import { ScrumList } from './components/ScrumList';

let TMS = ['Adrean', 'Liam', 'Sheamus', 'Ciaron', 'Sinead'];
const App = () => {
  // need to use a useEffect to get the list of items in backend in the list.
  // Get a fresh list from the backend
  // Add / Remove people permanently
  // TODO: If person is active and the close button is pressed. The timer should restart.
  // TODO: Clicking X should not call handleTMClick function.

  const [timerRunning, setTimerRunning] = useState(false);
  const [activeTM, setActiveTM] = useState('');
  const [teamMembers, setTeamMembers] = useState(TMS);
  const [elapsedTime, setElapsedTime] = useState(0);
  let prevTM;

  const handleTimerChange = () => {
    setTimerRunning((prev) => (prev = !prev));
  };

  const handleTMClick = (tm) => {
    setTimerRunning((prev) => (prev = !prev));
    if (prevTM && prevTM === tm) {
    } else if (activeTM === tm) {
      setActiveTM('');
      setTimerRunning(false);
    } else {
      setElapsedTime(0);
      setActiveTM(tm);
      setTimerRunning(true);
    }
    prevTM = tm;
  };

  const shuffleTMs = () => {
    const teamMemberArray = [...teamMembers];
    for (let i = teamMemberArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [teamMemberArray[i], teamMemberArray[j]] = [teamMemberArray[j], teamMemberArray[i]];
    }
    setTeamMembers(teamMemberArray);
  };

  const handleResetElapsedTime = () => {
    setElapsedTime(0);
  };

  const handleSetElapsedTime = () => {
    setElapsedTime((prevTime) => prevTime + 1);
  };

  const handleResetTM = () => {
    setActiveTM('');
  };

  const handlePauseTimer = () => {
    setTimerRunning(false);
  };

  const handleRemoveTM = (e, tm) => {
    e.stopPropagation();
    if (activeTM === tm) {
      setActiveTM('');
      // setTimerRunning((prev) => (prev = !prev));
      setTimerRunning(false);
    }
    if (e.target.parentElement.className === 'close') {
      const previousTMList = [...teamMembers];
      const updatedTMList = previousTMList.filter((teamMember) => teamMember !== tm);
      setTeamMembers(updatedTMList);
    }
  };

  const handleGetFreshList = () => {
    setTeamMembers(TMS);
    setActiveTM('');
    setTimerRunning(false);
  };

  return (
    <div className="container">
      <Stopwatch
        elapsedTime={elapsedTime}
        handleSetElapsedTime={handleSetElapsedTime}
        timerRunning={timerRunning}
        handleTimerChange={handleTimerChange}
        pauseTimer={handlePauseTimer}
        handleResetTM={handleResetTM}
        handleResetElapsedTime={handleResetElapsedTime}
      />
      <ScrumList
        timerRunning={timerRunning}
        handleTMClick={handleTMClick}
        TMS={teamMembers}
        activeTM={activeTM}
        shuffleTMs={shuffleTMs}
        removeTM={handleRemoveTM}
        getFreshList={handleGetFreshList}
      />
    </div>
  );
};

export default App;
