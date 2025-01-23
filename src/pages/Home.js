import React, { useState, useEffect, useRef } from 'react';
import '../styles/Home.css';

function Home({ activeSection }) {
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
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillStyle = '#636363';
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
      if (titleIndex <= title.length) {
        setTitleText(title.slice(0, titleIndex));
        titleIndex++;
        setTimeout(typeTitle, titleSpeed);
      }
    }

    function typeSubtitle() {
      if (subtitleIndex <= subtitle.length) {
        setSubtitleText(subtitle.slice(0, subtitleIndex));
        subtitleIndex++;
        setTimeout(typeSubtitle, subtitleSpeed);
      }
    }

    typeTitle();
    setTimeout(typeSubtitle, 1000);
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="matrix-background"></canvas>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1 className="glow-title">{titleText}</h1>
          <p className="glow-subtitle">{subtitleText}</p>
        </div>
      </header>

      {/* Dynamic Content Block (Only Shows If a Section is Active) */}
      {activeSection && (
        <div className="content-container">
          {activeSection}
        </div>
      )}
    </>
  );
}

export default Home;
