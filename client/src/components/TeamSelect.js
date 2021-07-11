import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

export const TeamSelect = () => {
  const { teamId } = useParams();
  let history = useHistory();

  return (
    <div>
      <div className="pb-1 d-flex justify-content-between">
        <button
          type="button"
          onClick={() => {
            history.push('/client-experience');
          }}
          className={`btn btn-link px-0 shadow-none text-decoration-none`}
          style={teamId && teamId === 'client-experience' ? styles : null}
        >
          Client Experience
        </button>

        <button
          type="button"
          onClick={() => {
            history.push('/capital-markets');
          }}
          className={`btn btn-link px-0 shadow-none text-decoration-none`}
          style={teamId && teamId === 'capital-markets' ? styles : null}
        >
          Captial Markets
        </button>
      </div>
      <div className="pb-1 d-flex justify-content-between">
        <button
          type="button"
          onClick={() => {
            history.push('/execution-fraud-servicing');
          }}
          className={`btn btn-link px-0 shadow-none text-decoration-none`}
          style={teamId && teamId === 'execution-fraud-servicing' ? styles : null}
        >
          Execution Fraud Servicing
        </button>
        <button
          type="button"
          onClick={() => {
            history.push('/platform');
          }}
          className={`btn btn-link px-0 shadow-none text-decoration-none`}
          style={teamId && teamId === 'platform' ? styles : null}
        >
          Platform
        </button>
      </div>
      <div className="pb-3 d-flex justify-content-around">
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
      </div>
    </div>
  );
};

const styles = {
  fontSize: '1.2rem',
  fontWeight: 'bold',
};
