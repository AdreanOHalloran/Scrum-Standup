import React from 'react';
import { ScrumTM } from './ScrumTM';
import { LoadingSpinner } from '../UI/LoadingSpinner';

export const ScrumList = ({ handleTMClick, TMS, activeTM, shuffleTMs, removeTM, getFreshList }) => {
  return (
    <>
      <ul className="list-group list-group-flush">
        {TMS ? (
          TMS.map((tm) => {
            return <ScrumTM key={tm} standupName={tm} handleTMClick={handleTMClick} activeTM={activeTM} removeTM={removeTM} />;
          })
        ) : (
          <LoadingSpinner />
        )}
      </ul>
    </>
  );
};
