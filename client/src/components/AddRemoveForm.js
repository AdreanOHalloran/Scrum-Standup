import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { LoadingSpinner } from '../UI/LoadingSpinner';
import { TeamSelect } from './TeamSelect';

export const AddRemoveForm = () => {
  const { teamId } = useParams();

  let history = useHistory();
  const [backendTMS, setBackendTMS] = useState();
  const [inputValue, setInputValue] = useState('');
  const [formError, setFormError] = useState(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamId]);

  const fetchData = async () => {
    const request = await fetch('/api/v1/teamMembers');
    const data = await request.json();
    let TMS = data.data;
    if (teamId) {
      TMS = TMS.filter((tm) => tm.team === teamId);
    }
    TMS = TMS.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return nameA > nameB ? 1 : -1;
    });
    setBackendTMS(TMS);
  };

  const handleDeleteTMBackend = async (id) => {
    try {
      await fetch(`/api/v1/teamMembers/${id}`, {
        method: 'DELETE',
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddTMBackend = async (e) => {
    e.preventDefault();
    if (checkTMExists()) {
      setFormError(true);
      setInputValue('');
      return;
    }

    const config = {
      method: 'POST',
      body: JSON.stringify({ name: inputValue, team: teamId ? teamId : null }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await fetch(`/api/v1/teamMembers/${teamId}`, config);
      const data = response.json();
      setInputValue('');
      setFormError(false);
      fetchData();
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const checkTMExists = () => {
    return backendTMS.some((tm) => tm.name.toLowerCase() === inputValue.toLowerCase());
  };

  return (
    <div className="my-4">
      <form className="input-group mb-3" onSubmit={handleAddTMBackend}>
        <input
          type="text"
          className={`form-control ${formError ? 'is-invalid' : ''}`}
          placeholder={`${formError ? 'Team Member Exists' : 'Add a TM....'}`}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="submit">
            Add
          </button>
        </div>
      </form>
      <ul className="list-group list-group-flush" style={{ fontSize: '1.1rem' }}>
        {backendTMS ? (
          backendTMS.map((tm) => {
            return (
              <li className={`list-group-item list-group-item py-0`} key={tm.name}>
                {tm.name}
                <button type="button" className="close" onClick={() => handleDeleteTMBackend(tm._id)}>
                  <span>&times;</span>
                </button>
              </li>
            );
          })
        ) : (
          <LoadingSpinner />
        )}
      </ul>
      <button className="btn btn-primary my-3" onClick={() => history.goBack()}>
        Back
      </button>
      <TeamSelect />
    </div>
  );
};
