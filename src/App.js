import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import MatrixBackground from './components/MatrixBackground'; 

import Home from './pages/Home';
import About from './pages/About';
import Demo from './pages/Demo';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      {/* Matrix Background is behind all pages */}
      <MatrixBackground />  
      
      {/* Navbar stays visible across all pages */}
      <NavBar /> 

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
