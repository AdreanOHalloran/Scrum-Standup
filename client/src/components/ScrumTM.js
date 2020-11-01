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

// <li className="list-group-item list-group-item-success py-0 ">
//   Adrean
//   <span className="pl-5">55s </span>
//   <button type="button" className="close" aria-label="Close">
//     <span aria-hidden="true">&times;</span>
//   </button>
// </li>
// <li className="list-group-item py-0 list-group-item-danger">Liam</li>
// <li className="list-group-item py-0">
//   Ciaron<span className="pl-5">time</span>
// </li>
// <li className="list-group-item py-0">Sheamus</li>
// <li className="list-group-item py-0">Sinead</li>
