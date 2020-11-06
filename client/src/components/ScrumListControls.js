import React from 'react';
import { Link } from 'react-router-dom';

export const ScrumListControls = ({ shuffleTMs, getFreshList }) => {
  return (
    <div className="py-3">
      <button onClick={shuffleTMs} type="button" className="btn btn-primary">
        <i className="fa fa-random fa-lg"></i>
      </button>
      <button onClick={getFreshList} type="button" className="btn btn-primary ml-2">
        Fresh List
      </button>
      <Link to="/add-remove-form" className="btn btn-primary float-right">
        Add/Remove TMs
      </Link>
    </div>
  );
};
