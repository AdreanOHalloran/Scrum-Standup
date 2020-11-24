import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

export const TeamSelect = () => {
  const { teamId } = useParams();
  let history = useHistory();

  return (
    <div className="pb-3 d-flex justify-content-between">
      <button
        type="button"
        onClick={() => {
          history.push('/');
        }}
        className={`btn btn-link px-0 shadow-none text-decoration-none`}
        style={!teamId ? styles : null}
      >
        All Team
      </button>
      <button
        type="button"
        onClick={() => {
          history.push('/space');
        }}
        className={`btn btn-link px-0 shadow-none text-decoration-none`}
        style={teamId && teamId === 'space' ? styles : null}
      >
        Team Space
      </button>
      <button
        type="button"
        onClick={() => {
          history.push('/jam');
        }}
        className={`btn btn-link px-0 shadow-none text-decoration-none`}
        style={teamId && teamId === 'jam' ? styles : null}
      >
        Team Jam
      </button>
    </div>
  );
};

const styles = {
  fontSize: '1.2rem',
  fontWeight: 'bold',
};
