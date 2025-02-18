import React, { useState, useEffect } from "react";

import WebAppCarousel from "../components/WebsiteCarousel";
import MusicPlayer from "../components/MusicPlayer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MiniGame from "../components/MiniGame";
import Contact from "../components/Contact";

import "../styles/globals.css";
import "../styles/LandingPage.css";
import "../styles/WebApp.css";
import "../styles/SoundDesign.css";
import "../styles/About.css";
import "../styles/Games.css";
import "../styles/Contact.css";

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
  const [subtextvisible, setSubtextVisible] = useState(true);
  const [activeTab, setActiveTab] = useState(null);
  const [navbarMoved, setNavbarMoved] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const title = "Braeden Duval";
    const subtitle = "Programmer & Audio Engineer";

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
    if (tab !== "games") {
      setGameStarted(false);
    }
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
            <div className="about-wrapper">
              <div className="about-header">
                <h2 className="category-title">About Me</h2>

              </div>
              <section className="demo-section-about">
                <div className="about-content">
                  <div className="description-box-about">
                    <p>
                    In a world full of vast opportunities, I’ve always been driven by a desire to pursue my passions and find new ways to grow. 
                    <p>After leaving Alberta to follow my passion for music, I dedicated myself to developing my skills and immersing myself in the creative process.</p>
                    Music became an important outlet, allowing me to connect with my emotions and escape the pressures of daily life. 
                    However, after reflecting on my journey, I realized that I wanted to combine my love for music with technology and game development. 
                    This led me to pivot and pursue a new path that merges both my creative and technical interests.
                    </p>
                    <p>
                    Currently, I’m pursuing a Computer Systems Technology Diploma at BCIT, where I’m building a solid foundation in software development and technology. 
                    Through my studies, I’ve learned how to combine creativity with problem-solving, from developing web applications to creating interactive experiences. 
                    This journey allows me to merge my passion for music and gaming with technology, whether it’s building applications that showcase my creative projects or 
                    designing immersive experiences that blend my technical skills with my love for games. 
                    I’m excited to see how my diverse interests continue to shape the work I do.
                    </p>
                  </div>
                </div>
              </section>
            </div>

          )}

          {activeTab === "apps" && (
            <div className="demo-section-apps">
              <WebAppCarousel />
            </div>
          )}

          {activeTab === "music" && (
            <section className="demo-section-music">
              <MusicPlayer tracks={musicTracks} />
            </section>
          )}

          {activeTab === "sound" && (
            <section className="demo-section-sound">
              <div className="sound-wrapper">
                <div className="sound-header">
                  <p>Coming Soon!</p>
                </div>
                <video className="profile-video" controls>
                  <source src="/assets/videos/Long_Term.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </section>
          )}


          {activeTab === "games" && (
            (gameStarted ? (
              <MiniGame exitGame={() => setGameStarted(false)} />
            ) :
              <section className="demo-section-games">
                <div className="games-wrapper">
                  <div className="games-header">
                    <p>Coming Soon!</p>
                  </div>
                  <p>In the meantime... Click the button!</p>
                  <img
                    className="profile-picture"
                    src="/assets/pictures/brady_avatar.png"
                    alt="Profile"
                    onClick={() => setGameStarted(true)}
                  />
                </div>
              </section>
            )
          )}

          {activeTab === "contact" && (
            <section className="demo-section-contact">
              <Contact />
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default PortfolioPage;
