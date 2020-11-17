import React, { useState } from 'react';
import { useInterval } from '../util/util';

export const Stopwatch = ({
  handleSetElapsedTime,
  elapsedTime,
  timerRunning,
  handleResetElapsedTime,
  handleTimerChange,
  pauseTimer,
  handleResetTM,
}) => {
  const [milliseconds, setMilliseconds] = useState('00');
  const [seconds, setSeconds] = useState('0');
  const [minutes, setMinutes] = useState('0');

  useInterval(
    () => {
      handleSetElapsedTime();
      const elapsedTimeString = elapsedTime.toString();
      setMilliseconds(elapsedTimeString.slice(-2));
      let diffInHrs = elapsedTime / 360000;
      let hh = Math.floor(diffInHrs);

      let diffInMin = (diffInHrs - hh) * 60;
      setMinutes(Math.floor(diffInMin).toString());

      let diffInSec = (diffInMin - minutes) * 60;
      setSeconds(Math.floor(diffInSec).toString());
    },
    timerRunning ? 10 : null
  );

  const handleRestart = () => {
    handleResetElapsedTime();
    setMilliseconds('00');
    setSeconds('0');
    setMinutes('0');
    pauseTimer();
    handleResetTM();
  };

  return (
    <div className="mb-3 mt-1 text-center">
      <div className="mb-2">
        <h1 style={{ display: 'inline' }}>
          {minutes > 0 ? `${minutes}m` : ''} {seconds}s
        </h1>
        <span className="pl-1" style={{ display: 'inline-block', maxWidth: '30px', minWidth: '30px' }}>
          {milliseconds}
        </span>
      </div>
      <button type="button" className="btn btn-primary py-1" onClick={handleTimerChange}>
        {timerRunning ? 'Stop' : 'Start'}
      </button>
      {elapsedTime === 0 ? null : (
        <button type="button" className="btn btn-primary py-1 ml-2" onClick={() => handleRestart()}>
          Reset
        </button>
      )}
    </div>
  );
};
