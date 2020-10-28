import React from 'react';
import { ScrumTM } from './ScrumTM';

const tms = ['Adrean', 'Liam', 'Sheamus', 'Ciaron', 'Sinead'];

export const ScrumList = ({ handleTimer }) => {
  return (
    <div className="container">
      <ul className="list-group list-group-flush">
        {tms.map((tm) => {
          return <ScrumTM key={tm} standupName={tm} />;
        })}
      </ul>
    </div>
  );
};
