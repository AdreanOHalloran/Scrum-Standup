import React, { useState, useEffect } from 'react';
import { Stopwatch } from './Stopwatch';
import { ScrumList } from './ScrumList';
import { ScrumListControls } from './ScrumListControls';

export const DailyScrumPage = () => {
  useEffect(() => {
    getTMs();
  }, []);

  const getTMs = async () => {
    const request = await fetch('/api/v1/teamMembers');
    const data = await request.json();
    const TMS = data.data.map((tm) => tm.name).sort();
    setTeamMembers(TMS);
  };

  const [timerRunning, setTimerRunning] = useState(false);
  const [activeTM, setActiveTM] = useState('');
  const [teamMembers, setTeamMembers] = useState();
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
    getTMs();
    setActiveTM('');
    setTimerRunning(false);
  };

  return (
    <>
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
        removeTM={handleRemoveTM}
      />
      <ScrumListControls shuffleTMs={shuffleTMs} getFreshList={handleGetFreshList} />
    </>
  );
};
