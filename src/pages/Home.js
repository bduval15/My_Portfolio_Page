import React, { useEffect, useRef } from 'react';
import '../styles/Home.css';

function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size dynamically
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const fontSize = 20; // Increased for better spacing
    const columns = Math.floor(canvas.width / fontSize); // Fix alignment
    const drops = Array(columns).fill(1);
    const matrixChars = '0123456789ABCDEF';

    function drawMatrix() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      ctx.font = `${fontSize}px monospace`;
  
      const cutoffY = canvas.height / 3;
      const cutoff = canvas.height / 3;

      for (let i = 0; i < drops.length; i++) {
          const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
          const x = i * fontSize;
          const y = drops[i] * fontSize;
  
          let gradientFactor = 0;

          if(y > cutoffY) {
            gradientFactor = (y - cutoff) / (canvas.height - cutoffY);
          }
          let r = Math.round(117 + gradientFactor * (255 - 117)); // 117 → 255 (grey to pink)
          let g = Math.round((1 - gradientFactor) * 87);          // 87 → 0 (grey to pink)
          let b = Math.round(104 + gradientFactor * (127 - 104));
  
          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`; 
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

  return (
    <>
      {/* Matrix Background */}
      <canvas ref={canvasRef} className="matrix-background"></canvas>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1 className="glow-title">Braeden Duval</h1>
          <p className="glow-subtitle">Audio Engineer & Developer</p>
          <a href="/demo" className="btn-neon">Placeholder</a>
        </div>
      </header>
    </>
  );
}

export default Home;
