import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';

import Home from './pages/Home';
import About from './pages/About';
import Demo from './pages/Demo';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <NavBar /> {/* Navbar stays visible on all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
