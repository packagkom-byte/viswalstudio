import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">🔍</span>
          <span className="logo-text">Viswalstudio</span>
        </div>
        <nav className="nav">
          <a href="#search">Search</a>
          <a href="#dashboard">Dashboard</a>
          <a href="#docs">Docs</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
