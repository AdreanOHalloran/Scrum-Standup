import React from 'react';
import { ScrumTM } from './ScrumTM';

export const ScrumList = ({ handleTMClick, TMS, activeTM, shuffleTMs, removeTM, getFreshList }) => {
  return (
    <div className="container" style={{ maxWidth: '400px' }}>
      <ul className="list-group list-group-flush">
        {TMS.map((tm) => {
          return <ScrumTM key={tm} standupName={tm} handleTMClick={handleTMClick} activeTM={activeTM} removeTM={removeTM} />;
        })}
      </ul>
      <button onClick={shuffleTMs} type="button" className="btn btn-primary">
        <i className="fa fa-random fa-lg"></i>
      </button>
      <button onClick={getFreshList}>Fresh List</button>
    </div>
  );
};
