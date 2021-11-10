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
            history.push('/verification-and-fraud');
          }}
          className={`btn btn-link px-0 shadow-none text-decoration-none`}
          style={teamId && teamId === 'verification-and-fraud' ? styles : null}
        >
          Verification and Fraud
        </button>

        <button
          type="button"
          onClick={() => {
            history.push('/credit-capital-markets');
          }}
          className={`btn btn-link px-0 shadow-none text-decoration-none`}
          style={teamId && teamId === 'credit-capital-markets' ? styles : null}
        >
          Credit & Capital Markets
        </button>
      </div>
      <div className="pb-1 d-flex justify-content-between">
        <button
          type="button"
          onClick={() => {
            history.push('/subsystem-enabling');
          }}
          className={`btn btn-link px-0 shadow-none text-decoration-none`}
          style={teamId && teamId === 'subsystem-enabling' ? styles : null}
        >
          Subsystem/Enabling
        </button>
        <button
          type="button"
          onClick={() => {
            history.push('/personal-loans');
          }}
          className={`btn btn-link px-0 shadow-none text-decoration-none`}
          style={teamId && teamId === 'personal-loans' ? styles : null}
        >
          Personal Loans
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
