import React, { useState, useEffect, useRef } from 'react';
import NavBar from '../components/NavBar';
import Demo from '../pages/Demo.js';
import About from '../pages/About.js';
import Contact from '../pages/Contact.js';
import '../styles/Home.css';

function Home() {
  const [activeSection, setActiveSection] = useState(null);
  const [titleText, setTitleText] = useState("");
  const [subtitleText, setSubtitleText] = useState("");
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const fontSize = 20;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);
    const matrixChars = '0123456789ABCDEF';

    function drawMatrix() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const greyShades = ['#B0B0B0', '#A0A0A0', '#909090', '#808080'];
        ctx.fillStyle = greyShades[Math.floor(Math.random() * greyShades.length)];
        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(drawMatrix, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const title = "Braeden Duval";
    const subtitle = "Developer & Audio Engineer";

    let titleIndex = 0;
    let subtitleIndex = 0;
    const titleSpeed = 100;
    const subtitleSpeed = 50;

    function typeTitle() {
      if (titleIndex < title.length) {
        setTitleText(title.slice(0, titleIndex + 1));
        titleIndex++;
        setTimeout(typeTitle, titleSpeed);
      } else {
        setTimeout(typeSubtitle, 500);
      }
    }

    function typeSubtitle() {
      if (subtitleIndex < subtitle.length) {
        setSubtitleText(subtitle.slice(0, subtitleIndex + 1));
        subtitleIndex++;
        setTimeout(typeSubtitle, subtitleSpeed);
      }
    }

    typeTitle();
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="matrix-background"></canvas>

      {/* ✅ ONLY ONE NAVBAR HERE */}
      <NavBar setActiveSection={setActiveSection} />

      <header className="hero">
        <div className="hero-content">
          <h1 className="glow-title">{titleText}</h1>
          <p className="glow-subtitle">{subtitleText}</p>
        </div>
      </header>

      {/* MODAL SYSTEM */}
      {activeSection && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={() => setActiveSection(null)}>✖</span>
            {activeSection === 'demo' && <Demo />}
            {activeSection === 'about' && <About />}
            {activeSection === 'contact' && <Contact />}
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
