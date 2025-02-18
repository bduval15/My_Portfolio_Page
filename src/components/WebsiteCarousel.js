import React, { useState, useEffect } from "react";
import "../styles/WebApp.css"; 
import "../styles/Carousel.css"; 
import "../styles/globals.css";

function WebAppCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const webAppSections = [
    // NotEFY Section
    <div className="webapp-align" key="notefy">
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
            <li><strong>Create Events</strong> – Set up event details, including date, time, location, and description.</li>
            <li><strong>RSVP Management</strong> – Track attendee responses to monitor event participation.</li>
            <li><strong>Profile Customization</strong> – Personalize user profiles for a tailored app experience.</li>
          </ul>
          <p className="description-text"><strong>Technologies Used:</strong></p>
          <ul className="description-text">
            <li><strong>Frontend:</strong> HTML5, CSS3, JavaScript, Bootstrap 5</li>
            <li><strong>Backend:</strong> Firebase for authentication & real-time database</li>
            <li><strong>Development Tools:</strong> Git & GitHub, Visual Studio Code</li>
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
    </div>,

    // Naruto Fan Page Section
    <div className="webapp-align" key="naruto">
      <div className="webapp-wrapper-2">
        <div className="description-box-2">
          <h2 className="description-title-2">Naruto Fan Page</h2>
          <p className="description-text-2">
            <strong>Naruto Fan Page</strong> is a web application designed to showcase an interactive UI inspired by the world of Naruto.
          </p>
          <p className="description-text-2"><strong>Key Features:</strong></p>
          <ul className="description-text-2">
            <li><strong>Dynamic Image Carousel</strong> – The main banner cycles through four different Naruto-themed images.</li>
            <li><strong>Dynamic Menus</strong> – Interactive dropdown menus populate automatically for smooth navigation.</li>
            <li><strong>Article Modals</strong> – Clicking "More Details" on any article opens a modal, allowing users to read the full content.</li>
          </ul>
          <p className="description-text-2"><strong>Technologies Used:</strong></p>
          <ul className="description-text-2">
            <li><strong>Frontend:</strong> HTML5, CSS3, JavaScript</li>
            <li><strong>Backend:</strong> Originally built with Node.js and MySQL, later transitioned to a Vercel-compatible backend</li>
            <li><strong>Development Tools:</strong> Visual Studio Code</li>
          </ul>
          <p className="description-text-2">
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
  ];

  const nextApp = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % webAppSections.length);
  };

  const prevApp = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + webAppSections.length) % webAppSections.length);
  };

  useEffect(() => {
    const hideScrollbars = () => {
      document.querySelectorAll(".webapp-iframe").forEach((iframe) => {
        try {
          iframe.contentWindow.document.body.style.overflow = "hidden";
        } catch (error) {
          console.warn("Cross-origin iframe; unable to modify styles.");
        }
      });
    };

    setTimeout(hideScrollbars, 1500);
  }, [currentIndex]);

  return (
    <section className="webapp-carousel">
      <button className="carousel-btn left" onClick={prevApp}>❮</button>

      <div className="carousel-content">
        {webAppSections[currentIndex]}
      </div>

      <button className="carousel-btn right" onClick={nextApp}>❯</button>
    </section>
  );
}

export default WebAppCarousel;
