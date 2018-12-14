import * as React from 'react';
import logo from '../logo.svg';

import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>

      <Link to="/">Home</Link>
      <Link to="/documents">Documents</Link>
      <Link to="/login">Login</Link>
      <Link to="/inexisting_route">Not found</Link>
    </header>
  );
};

export default Header;
