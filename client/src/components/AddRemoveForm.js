import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LoadingSpinner } from '../UI/LoadingSpinner';

export const AddRemoveForm = () => {
  const [backendTMS, setBackendTMS] = useState();
  const [inputValue, setInputValue] = useState('');
  const [formError, setFormError] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const request = await fetch('/api/v1/teamMembers');
    const data = await request.json();
    const TMS = data.data;
    const TMsSorted = TMS.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return nameA > nameB ? 1 : -1;
    });
    setBackendTMS(TMsSorted);
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
      body: JSON.stringify({ name: inputValue }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await fetch(`/api/v1/teamMembers`, config);
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
      <ul className="list-group list-group-flush">
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
      <Link to="/" className="btn btn-primary mt-3">
        Back
      </Link>
    </div>
  );
};
