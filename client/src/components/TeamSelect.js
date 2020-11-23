import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

export const TeamSelect = () => {
  const { teamId } = useParams();
  let history = useHistory();
  console.log(teamId);

  return (
    <div className="pb-3 d-flex justify-content-between">
      <button
        type="button"
        onClick={() => {
          history.push('/');
        }}
        className={`btn btn-link px-0 ${!teamId && 'font-weight-bold'}`}
      >
        All Team
      </button>
      <button
        type="button"
        onClick={() => {
          history.push('/space');
        }}
        className={`btn btn-link px-0 ${teamId && teamId === 'space' && 'font-weight-bold'}`}
      >
        Team Space
      </button>
      <button
        type="button"
        onClick={() => {
          history.push('/jam');
        }}
        className={`btn btn-link px-0 ${teamId && teamId === 'jam' && 'font-weight-bold'}`}
      >
        Team Jam
      </button>
    </div>
  );
};
