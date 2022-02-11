import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Stopwatch } from './Stopwatch';
import { ScrumList } from './ScrumList';
import { ScrumListControls } from './ScrumListControls';

export const DailyScrumPage = () => {
  const { teamId } = useParams();

  useEffect(() => {
    getTMs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamId]);

  const getTMs = async () => {
    const request = await fetch('/api/v1/teamMembers');
    const data = await request.json();
    let TMS = data.data;
    if (teamId) {
      TMS = TMS.filter((tm) => tm.teams.indexOf(teamId) >= 0);
    }
    TMS = Array.from(new Set(TMS.map((tm) => tm.name)))
      .sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1));
    setTeamMembers(TMS);
  };

  const [timerRunning, setTimerRunning] = useState(false);
  const [activeTM, setActiveTM] = useState('');
  const [teamMembers, setTeamMembers] = useState();
  const [elapsedTime, setElapsedTime] = useState(0);
  const [prevTMClicked, setPrevTMClicked] = useState('');

  const handleTimerChange = () => {
    setTimerRunning((prev) => (prev = !prev));
  };

  const handleTMClick = (tm) => {
    setTimerRunning((prev) => (prev = !prev));
    if (!timerRunning && prevTMClicked === tm && activeTM === tm) {
      setActiveTM(tm);
    } else if (prevTMClicked && prevTMClicked === tm) {
      setActiveTM('');
      if (activeTM !== tm) {
        setActiveTM(tm);
      }
    } else if (activeTM === tm) {
      setActiveTM('');
      setTimerRunning(false);
    } else {
      setElapsedTime(0);
      setActiveTM(tm);
      setTimerRunning(true);
    }
    setPrevTMClicked(tm);
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
