import React, { useRef, useEffect, useState } from "react";
import "../styles/MusicPlayer.css";

const MusicPlayer = ({ tracks }) => {
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1.0);

  useEffect(() => {
    const audio = audioRef.current;
  
    if (!audio) return;
  
    // Reset time & progress when changing track
    audio.pause();
    setIsPlaying(false);
    setCurrentTime(0);
    setProgress(0);
    setDuration(audio.duration || 0);
    audio.load();
  
    // Handle track progress
    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    };
  
    // Ensure duration updates when metadata loads
    const loadMetadata = () => {
      setDuration(audio.duration);
    };
  
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", loadMetadata);
  
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", loadMetadata);
    };
  }, [currentTrack]); // 🔥 Now runs whenever track changes
  

  // Toggle Play/Pause Functionality
  const togglePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Handle Volume Control
  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  // Handle Track Seek (Progress Bar)
  const handleSeek = (event) => {
    const newTime = (event.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setProgress(event.target.value);
  };

  // 🔥 Audio Visualizer Setup
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth * 0.8;
    canvas.height = 100;

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;

    const gainNode = audioCtx.createGain();
    gainNode.gain.value = 1.0;

    let source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    let smoothBars = new Array(bufferLength).fill(10);

    function drawWaveform() {
      requestAnimationFrame(drawWaveform);
      analyser.getByteFrequencyData(dataArray);

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

        ctx.fillRect(x, canvas.height - smoothBars[i], barWidth - 1, smoothBars[i]);
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

        <audio ref={audioRef} src={tracks[currentTrack].audio} />

        {/* Controls Layout - Progress (Left), Buttons (Center), Volume (Right) */}
        <div className="music-controls-container">

          {/* Progress Bar and Time */}
          <div className="progress-container">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="progress-bar"
            />
            <div className="time-display">
              {isNaN(currentTime) ? "00:00" : new Date(currentTime * 1000).toISOString().substr(14, 5)} /
              {isNaN(duration) ? "00:00" : new Date(duration * 1000).toISOString().substr(14, 5)}
            </div>

          </div>

          {/* Control Buttons */}
          <div className="music-controls">
            <button onClick={() => setCurrentTrack((prev) => Math.max(prev - 1, 0))}>⏮</button>
            <button onClick={togglePlayPause}>{isPlaying ? "⏸" : "▶️"}</button>
            <button onClick={() => setCurrentTrack((prev) => Math.min(prev + 1, tracks.length - 1))}>⏭</button>
          </div>

          {/* Volume Slider */}
          <div className="volume-container">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-slider"
            />
            <div className="volume-display">{Math.round(volume * 100)}%</div>
          </div>
        </div>

        {/* Audio Visualizer */}
        <canvas ref={canvasRef} id="waveform" className="music-visualizer"></canvas>
      </div>
    </div>
  );
};

export default MusicPlayer;
