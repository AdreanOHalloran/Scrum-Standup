import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const AddRemoveForm = ({}) => {
  const [backendTMS, setBackendTMS] = useState();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    async function fetchData() {
      const request = await fetch('/api/v1/teamMembers');
      const data = await request.json();
      const TMS = data.data;
      setBackendTMS(TMS);
    }
    fetchData();
  }, [backendTMS]);

  const handleDeleteTMBackend = async (id) => {
    try {
      await fetch(`/api/v1/teamMembers/${id}`, {
        method: 'DELETE',
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddTMBackend = async (e) => {
    // TODO: Do a check to see if name already in backend
    e.preventDefault();
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
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container my-4" style={{ maxWidth: '400px' }}>
      <form className="input-group mb-3" onSubmit={handleAddTMBackend}>
        <input
          type="text"
          className="form-control"
          placeholder="Add a TM...."
          aria-label="Recipient's username"
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
        {backendTMS &&
          backendTMS.map((tm) => {
            return (
              <li className={`list-group-item list-group-item py-0`}>
                {tm.name}
                <button type="button" className="close" aria-label="Close" onClick={() => handleDeleteTMBackend(tm._id)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </li>
            );
          })}
      </ul>
      <Link to="/" className="btn btn-primary">
        Daily Scrum
      </Link>
    </div>
  );
};
