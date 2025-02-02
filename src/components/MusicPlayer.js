import React, { useRef, useEffect, useState } from "react";
import "../styles/MusicPlayer.css"; 

const MusicPlayer = ({ tracks }) => {
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [audioCtx, setAudioCtx] = useState(null);

  useEffect(() => {
    if (!audioRef.current) return;
  
    const audio = audioRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
  
    canvas.width = window.innerWidth * 0.8;
    canvas.height = 100;
  
    // ✅ Create a separate AudioContext for visualization
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
  
    // ✅ Create a separate GainNode at full volume for independent visualization
    const gainNode = audioCtx.createGain();
    gainNode.gain.value = 1.0; // Keeps full volume for analysis
  
    // ✅ Properly handle media source node (prevents errors when switching tracks)
    let source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(gainNode);
    gainNode.connect(audioCtx.destination); // ✅ Ensures the audio plays normally
  
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    let smoothBars = new Array(bufferLength).fill(10);
  
    function drawWaveform() {
      requestAnimationFrame(drawWaveform);
      analyser.getByteFrequencyData(dataArray); // ✅ Read raw frequency data
  
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      const barWidth = (canvas.width / bufferLength) * 1.5;
      let x = 0;
      let maxBarHeight = canvas.height * 0.75;
  
      for (let i = 0; i < bufferLength; i++) {
        let normalizedHeight = (dataArray[i] / 255) * maxBarHeight;
        let targetHeight = Math.max(normalizedHeight, 5);
  
        smoothBars[i] += (targetHeight - smoothBars[i]) * 0.1;
  
        ctx.fillStyle = `rgba(255, 0, 255, 0.8)`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(255, 0, 255, 0.6)";
  
        fillRoundedRect(ctx, x, canvas.height - smoothBars[i], barWidth - 1, smoothBars[i], 4);
        x += barWidth + 0.5;
      }
    }
  
    audio.addEventListener("play", () => {
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }
      drawWaveform();
    });
  
    return () => {
      source.disconnect();
      analyser.disconnect();
      gainNode.disconnect();
      audioCtx.close();
    };
  }, [currentTrack]);
  
  
  
  
  
  
  
  
  
  

function fillRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
  ctx.fill();
}

  return (
    <div className="music-player-container">
      <div className="music-library">
        {tracks.map((track, index) => (
          <div
            key={index}
            className={`music-item ${currentTrack === index ? "active" : ""}`}
            onClick={() => setCurrentTrack(index)}
          >
            <img src={track.cover} alt={track.title} className="music-cover" />
            {track.title}
          </div>
        ))}
      </div>

      <div className="music-main-player">
        <img src={tracks[currentTrack].cover} alt="Album Art" className="music-main-cover" />
        <h3>{tracks[currentTrack].title}</h3>
        <audio ref={audioRef} src={tracks[currentTrack].audio} controls></audio>

        <div className="music-controls">
          <button onClick={() => setCurrentTrack((prev) => Math.max(prev - 1, 0))}>⏮</button>
          <button onClick={() => audioRef.current.play()}>▶️ / ⏸</button>
          <button onClick={() => setCurrentTrack((prev) => Math.min(prev + 1, tracks.length - 1))}>⏭</button>
        </div>
        <canvas ref={canvasRef} id="waveform" className="music-visualizer"></canvas>
      </div>
    </div>
  );
};

export default MusicPlayer;
