import React, { useState, useEffect, useRef } from "react";

import MusicPlayer from "../components/MusicPlayer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../styles/PortfolioPage.css";
import "../styles/WebApp.css";
import "../styles/SoundDesign.css";


const soundDesignVideos = ["Find_You", "Iwaly"];

const musicTracks = [
  {
    title: "Next Time",
    cover: "/assets/pictures/until_next_time_cover.png",
    audio: "/assets/audio/NextTime.mp3",
  },
  {
    title: "Find You",
    cover: "/assets/pictures/Find_you_cover.png",
    audio: "/assets/audio/FindYou.mp3",
  },
  {
    title: "Warp Drive",
    cover: "/assets/pictures/Warp_Drive_cover.png",
    audio: "/assets/audio/WarpDrive.mp3",
  },
  {
    title: "5am",
    cover: "/assets/pictures/5_am_cover.png",
    audio: "/assets/audio/5AM.mp3",
  },
];

function PortfolioPage() {

  const [titleText, setTitleText] = useState("");
  const [subtitleText, setSubtitleText] = useState("");
  const [subtextVisible, setSubtextVisible] = useState(false);

  const [activeTab, setActiveTab] = useState("apps");

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

  // Slick carousel settings (only for Sound Design now)
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    draggable: true,
    swipe: true,
    pauseOnHover: true,
  };

  return (
    <div className="portfolio-page">
      <header className="hero">
        <div className="hero-content">
          <h1 className="glow-title">{titleText}</h1>
          <p className="glow-subtitle">{subtitleText}</p>
          <p className={`hero-subtext ${subtextVisible ? "fade-in" : ""}`}>
            Explore my work in web development, music production, sound design, and more.
          </p>
        </div>
      </header>

      <nav className="portfolio-nav">
        <button className={activeTab === "about" ? "active-tab" : ""} onClick={() => setActiveTab("about")}>About</button>
        <button className={activeTab === "apps" ? "active-tab" : ""} onClick={() => setActiveTab("apps")}>Apps / Web Pages</button>
        <button className={activeTab === "music" ? "active-tab" : ""} onClick={() => setActiveTab("music")}>Music</button>
        <button className={activeTab === "sound" ? "active-tab" : ""} onClick={() => setActiveTab("sound")}>Sound Design</button>
        <button className={activeTab === "games" ? "active-tab" : ""} onClick={() => setActiveTab("games")}>Games</button>
        <button className={activeTab === "contact" ? "active-tab" : ""} onClick={() => setActiveTab("contact")}>Contact</button>
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

        <div className="demo-container">
          {activeTab === "apps" && (
            <section className="demo-section">
              {/* NotEFY */}
              <div className="webapp-align">
              <div className="webapp-wrapper">
                <div className="description-box">
                  <h2 className="description-title">NotEFY Event Planner</h2>
                  <p className="description-text">
                    <strong>NotEFY</strong> is a prototype mobile application designed to streamline event planning.
                    It allows users to create and manage events effortlessly, track RSVPs, and customize their user
                    profiles to enhance their planning experience.
                  </p>
                  <p className="description-text"><strong>Key Features:</strong></p>
                  <ul className="description-text">
                    <li>
                      <strong>Create Events</strong> – Set up event details, including date, time, location, and description.
                    </li>
                    <li>
                      <strong>RSVP Management</strong> – Track attendee responses to monitor event participation.
                    </li>
                    <li>
                      <strong>Profile Customization</strong> – Personalize user profiles for a tailored app experience.
                    </li>
                  </ul>
                  <p className="description-text"><strong>Technologies Used:</strong></p>
                  <ul className="description-text">
                    <li><strong>Frontend:</strong> HTML5, CSS3, JavaScript, Bootstrap 5</li>
                    <li><strong>Backend:</strong> Firebase for authentication & real-time database</li>
                    <li><strong>Development Tools:</strong> Git & GitHub for version control, Visual Studio Code</li>
                  </ul>
                  <p className="description-text">
                    NotEFY serves as a foundational prototype demonstrating effective event management functionalities,
                    leveraging modern web technologies to provide a user-friendly interface and reliable performance.
                  </p>
                </div>
                <div className="webapp-container">
                  <iframe
                    src="https://notefy-39045.web.app/"
                    className="webapp-iframe"
                    title="NotEFY Web App Preview"
                  ></iframe>
                </div>
              </div>
              </div>

              {/* Naruto */}
              <div className="webapp-align">
              <div className="webapp-wrapper-2">
                <div className="description-box-2">
                  <h2 className="description-title">Naruto Fan Page</h2>
                  <p className="description-text">
                    The Naruto Fan Page is a web application designed to showcase an interactive UI inspired by the world of Naruto.
                  </p>
                  <p className="description-text"><strong>Key Features:</strong></p>
                  <ul className="description-text">
                    <li>
                      <strong>Dynamic Image Carousel</strong> – The main banner cycles through four different
                      Naruto-themed images.
                    </li>
                    <li>
                      <strong>Dynamic Menus</strong> – Interactive dropdown menus populate automatically for smooth navigation.
                    </li>
                    <li>
                      <strong>Article Modals</strong> – Clicking "More Details" on any article opens a modal,
                      allowing users to read the full content.
                    </li>
                  </ul>
                  <p className="description-text"><strong>Technologies Used:</strong></p>
                  <ul className="description-text">
                    <li><strong>Frontend:</strong> HTML5, CSS3, JavaScript</li>
                    <li>
                      <strong>Backend:</strong> Originally built with Node.js and MySQL,
                      later transitioned to a Vercel-compatible backend.
                    </li>
                    <li><strong>Development Tools:</strong> Visual Studio Code for development.</li>
                  </ul>
                  <p className="description-text">
                    This fan page serves as a design showcase, emphasizing modern web layouts, interactive features,
                    and smooth navigation for an engaging user experience.
                  </p>
                </div>
                <div className="webapp-container-2">
                  <iframe
                    src="https://naruto-fan-page-sable.vercel.app/"
                    className="webapp-iframe-2"
                    title="Naruto Fan Page Preview"
                  ></iframe>
                </div>
              </div>
              </div>
            </section>
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
