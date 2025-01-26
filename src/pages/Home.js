import React, { useState, useEffect } from 'react';
import '../styles/Home.css';

function Home({ activeSection }) {
  const [titleText, setTitleText] = useState("");
  const [subtitleText, setSubtitleText] = useState("");

  useEffect(() => {
    const title = "Braeden Duval";
    const subtitle = "Software Developer & Audio Engineer";

    let titleIndex = 0;
    let subtitleIndex = 0;
    const titleSpeed = 80;
    const subtitleSpeed = 40;

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
