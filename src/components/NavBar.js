import React from 'react';
import '../styles/NavBar.css';

function NavBar({ setActiveSection }) {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <a href="#" onClick={() => setActiveSection(null)} className="nav-link">Home</a>
        </li>
        <li>
          <a href="#" onClick={() => setActiveSection("demo")} className="nav-link">Demo</a>
        </li>
        <li>
          <a href="#" onClick={() => setActiveSection("about")} className="nav-link">About</a>
        </li>
        <li>
          <a href="#" onClick={() => setActiveSection("contact")} className="nav-link">Contact</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
