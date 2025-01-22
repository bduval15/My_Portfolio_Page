import React, { useState } from 'react';
import '../styles/NavBar.css';

function NavBar({ setActiveSection }) {
  const [activeLink, setActiveLink] = useState(null);

  const handleNavClick = (section) => {
    setActiveSection(section);
    setActiveLink(section);  // Set the active link manually
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <a 
            href="#" 
            onClick={() => handleNavClick(null)} 
            className={`nav-link ${activeLink === null ? "active" : ""}`}
          >
            Home
          </a>
        </li>
        <li>
          <a 
            href="#" 
            onClick={() => handleNavClick("demo")} 
            className={`nav-link ${activeLink === "demo" ? "active" : ""}`}
          >
            Demo
          </a>
        </li>
        <li>
          <a 
            href="#" 
            onClick={() => handleNavClick("about")} 
            className={`nav-link ${activeLink === "about" ? "active" : ""}`}
          >
            About
          </a>
        </li>
        <li>
          <a 
            href="#" 
            onClick={() => handleNavClick("contact")} 
            className={`nav-link ${activeLink === "contact" ? "active" : ""}`}
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
