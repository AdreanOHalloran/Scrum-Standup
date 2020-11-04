import React from 'react';

export const ScrumTM = ({ standupName, handleTMClick, activeTM, removeTM }) => {
  let active;
  if (activeTM === standupName) {
    active = 'success';
  }

  return (
    <li className={`list-group-item list-group-item-${active} py-0`} onClick={() => handleTMClick(standupName)}>
      {standupName}
      <button type="button" className="close" onClick={(e) => removeTM(e, standupName)} aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </li>
  );
};
