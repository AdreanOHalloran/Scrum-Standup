import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { TeamSelect } from './TeamSelect';

export const ScrumListControls = ({ shuffleTMs, getFreshList }) => {
  const { teamId } = useParams();
  let history = useHistory();
  return (
    <div className="pt-3">
      <div className="pb-3">
        <button onClick={shuffleTMs} type="button" className="btn btn-primary">
          <i className="fa fa-random fa-lg"></i>
        </button>
        <button onClick={getFreshList} type="button" className="btn btn-primary ml-2">
          Fresh List
        </button>
        <button
          onClick={() => {
            history.push(`add-remove-form/${teamId ? teamId : ''}`);
          }}
          className="btn btn-primary float-right"
        >
          <i className="fa fa-minus fa-m"></i> / <i className="fa fa-plus fa-m"></i> TMs
        </button>
      </div>
      <TeamSelect />
    </div>
  );
};
