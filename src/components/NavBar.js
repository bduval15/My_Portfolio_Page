import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavBar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/demo" className={`nav-link ${location.pathname === "/demo" ? "active" : ""}`}>
            Demo
          </Link>
        </li>
        <li>
          <Link to="/about" className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}>
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`}>
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
