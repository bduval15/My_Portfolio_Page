import React, { useState, useEffect } from "react";

import WebAppCarousel from "../components/WebsiteCarousel";
import MusicPlayer from "../components/MusicPlayer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../styles/LandingPage.css";
import "../styles/WebApp.css";
import "../styles/SoundDesign.css";

const soundDesignVideos = ["Find_You", "Iwaly"];

const musicTracks = [
  { title: "After Hours", cover: "/assets/pictures/After_Hours.png", audio: "/assets/audio/AfterHours.mp3" },
  { title: "Midnight Flights", cover: "/assets/pictures/Midnight_Flights_Cover.png", audio: "/assets/audio/MidnightFlights.mp3" },
  { title: "Twelve Thirty Four", cover: "/assets/pictures/1234_cover.png", audio: "/assets/audio/1234.mp3" },
  { title: "Running Out of Time", cover: "/assets/pictures/running_out_of_time_cover.png", audio: "/assets/audio/Running.mp3" },
  { title: "Warp Drive", cover: "/assets/pictures/Warp_Drive_cover.png", audio: "/assets/audio/WarpDrive.mp3" },
  { title: "Until Next Time", cover: "/assets/pictures/until_next_time_cover.png", audio: "/assets/audio/NextTime.mp3" },
  { title: "Find You", cover: "/assets/pictures/Find_you_cover.png", audio: "/assets/audio/FindYou.mp3" },
  { title: "5 AM", cover: "/assets/pictures/5_am_cover.png", audio: "/assets/audio/5AM.mp3" },
  { title: "I Will Always Love You", cover: "/assets/pictures/IWALY_Cover.png", audio: "/assets/audio/IWALY.mp3" },
];

function PortfolioPage() {
  const [titleText, setTitleText] = useState("");
  const [subtitleText, setSubtitleText] = useState("");
  const [subtextVisible, setSubtextVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const [navbarMoved, setNavbarMoved] = useState(false);

  useEffect(() => {
    const title = "Braeden Duval";
    const subtitle = "Software Developer & Audio Engineer";

    let titleIndex = 0;
    let subtitleIndex = 0;

    const titleSpeed = 80;
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
      } else {
        setTimeout(() => setSubtextVisible(true), 500);
      }
    }

    typeTitle();
    setTimeout(typeSubtitle, 1000);
  }, []);

  useEffect(() => {
    if (activeTab) {
      setNavbarMoved(true);
    }
  }, [activeTab]);

  const handleTabChange = (tab) => {
    if (activeTab === tab) {
      setActiveTab(null);
      setNavbarMoved(false);
    } else {
      setActiveTab(tab);
      setNavbarMoved(true);
    }
  };

  return (
    <div className={`portfolio-page ${!activeTab ? "home-page" : ""}`}>
      <div className={`content-container ${navbarMoved ? "shifted" : ""}`}>
        {!activeTab && (
          <section className="landing-section">
            <header className="hero">
              <div className="hero-content">
                <h1 className="glow-title">{titleText}</h1>
                <p className="glow-subtitle">{subtitleText}</p>

              </div>
              <div className="welcome-container">
                <h2 className="category-title-landing">Welcome to My Portfolio</h2>
                <p>Select a category from the navbar to view my work.</p>
              </div>
            </header>
          </section>
        )}

        <nav className={`portfolio-nav ${navbarMoved ? "moved" : ""}`}>
          <button className={activeTab === "about" ? "active-tab" : ""} onClick={() => handleTabChange("about")}>About</button>
          <button className={activeTab === "apps" ? "active-tab" : ""} onClick={() => handleTabChange("apps")}>Apps / Web Pages</button>
          <button className={activeTab === "music" ? "active-tab" : ""} onClick={() => handleTabChange("music")}>Music</button>
          <button className={activeTab === "sound" ? "active-tab" : ""} onClick={() => handleTabChange("sound")}>Sound Design</button>
          <button className={activeTab === "games" ? "active-tab" : ""} onClick={() => handleTabChange("games")}>Games</button>
          <button className={activeTab === "contact" ? "active-tab" : ""} onClick={() => handleTabChange("contact")}>Contact</button>
        </nav>

        <div className="demo-container">
          {activeTab === "about" && (
            <section className="demo-section">
              <h2 className="category-title">About Me</h2>
              <div className="description-box">
                <p>
                  I'm Braeden Duval, a passionate Software Developer & Audio Engineer.
                  I specialize in creating dynamic web applications, music production,
                  and sound design for various media projects.
                </p>
                <p>
                  My goal is to build immersive user experiences through technology
                  and creativity, bringing interactive applications and audio-driven
                  content to life.
                </p>
              </div>
            </section>
          )}

          {activeTab === "apps" && (
            <div className="demo-section-apps">
              <WebAppCarousel />
            </div>
          )}

          {activeTab === "music" && (
            <section className="demo-section">
              <MusicPlayer tracks={musicTracks} />
            </section>
          )}

          {activeTab === "sound" && (
            <section className="demo-section">
              <div className="video-section">
                <h3 className="carousel-title"></h3>
                <Slider {...sliderSettings} className="video-carousel">
                  {soundDesignVideos.map((video) => (
                    <div className="video-wrapper" key={video}>
                      <video className="carousel-video" controls>
                        <source src={`/assets/videos/${video}.mp4`} type="video/mp4" />
                      </video>
                    </div>
                  ))}
                </Slider>
              </div>
            </section>
          )}

          {activeTab === "games" && (
            <section className="demo-section">
              <p>Coming Soon!</p>
            </section>
          )}
        </div>
      </div>

      {activeTab === "contact" && (
        <section className="demo-section">
          <h2 className="category-title">Contact Me</h2>
          <div className="description-box">
            <p>
              Feel free to reach out for collaborations, freelance projects,
              or just to say hi! You can contact me through the following channels:
            </p>
            <ul>
              <li><strong>Email:</strong> your.email@example.com</li>
              <li><strong>GitHub:</strong> github.com/yourprofile</li>
              <li><strong>LinkedIn:</strong> linkedin.com/in/yourprofile</li>
            </ul>
          </div>
        </section>
      )}

    </div>

  );
}

export default PortfolioPage;
