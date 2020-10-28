import React, { useState } from 'react';
import { useInterval } from '../util/util';

export const Stopwatch = () => {
  const [timerRunning, setTimerIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [milliseconds, setMilliseconds] = useState('00');
  const [seconds, setSeconds] = useState('0');
  const [minutes, setMinutes] = useState('0');

  useInterval(
    () => {
      setElapsedTime((prevTime) => prevTime + 1);
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
    setElapsedTime(0);
    setMilliseconds('00');
    setSeconds('0');
    setMinutes('0');
    setTimerIsRunning(false);
  };

  return (
    <div className="container my-4 text-center">
      <div className="mb-2">
        <h1 style={{ display: 'inline' }}>
          {minutes > 0 ? `${minutes}m` : ''} {seconds}s
        </h1>
        <span className="pl-2">{milliseconds}</span>
      </div>
      <button
        type="button"
        className="btn btn-primary py-1"
        onClick={() => setTimerIsRunning((prevState) => (prevState = !prevState))}
      >
        {timerRunning ? 'Stop' : 'Start'}
      </button>
      {elapsedTime === 0 ? null : (
        <button type="button" className="btn btn-primary py-1" onClick={() => handleRestart()}>
          Reset
        </button>
      )}
    </div>
  );
};
