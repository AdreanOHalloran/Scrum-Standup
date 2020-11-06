import React from 'react';
import logo from '../images/logo.png';

export const Header = () => {
  return (
    <header className="pt-2">
      <img src={logo} alt="logo" style={{ maxWidth: '100%' }} />
    </header>
  );
};
