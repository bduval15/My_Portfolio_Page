import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/Demo.css";

function Demo() {
  // Slick carousel settings
  const settings = {
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
    <section className="demo-section">
      <div className="demo-container">

        {/* Notefy: Web App */}
        <div className="webapp-wrapper">
          <div className="description-box">
            <h2 className="description-title">NotEFY Event Planner</h2>
            <p className="description-text">
              <strong>NotEFY</strong> is a prototype mobile application designed to streamline event planning.
              It allows users to create and manage events effortlessly, track RSVPs, and customize their user profiles to enhance their planning experience.
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
              title="Web App Preview"
            ></iframe>
          </div>
        </div>

        {/* Naruto: Web App */}
        <div className="webapp-wrapper-2">
          <div className="description-box">
            <h2 className="description-title">Naruto Fan Page</h2>
            <p className="description-text">
              The Naruto Fan Page is a web application designed to showcase an interactive UI inspired by the world of Naruto.
            </p>

            <p className="description-text"><strong>Key Features:</strong></p>
            <ul className="description-text">
              <li><strong>Dynamic Image Carousel</strong> – The main banner cycles through four different Naruto-themed images.</li>
              <li><strong>Dynamic Menus</strong> – Interactive dropdown menus populate automatically for smooth navigation.</li>
              <li><strong>Article Modals</strong> – Clicking "More Details" on any article opens a modal, allowing users to read the full content.</li>
            </ul>
            <p className="description-text"><strong>Technologies Used:</strong></p>
            <ul className="description-text">
              <li><strong>Frontend:</strong> HTML5, CSS3, JavaScript</li>
              <li><strong>Backend:</strong> Originally built with Node.js and MySQL, later transitioned to a Vercel-compatible backend.</li>
              <li><strong>Development Tools:</strong> Visual Studio Code for development.</li>
            </ul>
            <p className="description-text">
              This fan page serves as a design showcase, emphasizing modern web layouts, interactive features, and smooth navigation for an engaging user experience.
            </p>
          </div>
          <div className="webapp-container-2">
            <iframe
              src="https://naruto-fan-page-sable.vercel.app/"
              className="webapp-iframe-2"
              title="Web App Preview"
            ></iframe>
          </div>
        </div>

        {/* 🎬 Video Section */}
        <div className="video-section">
          <h2 className="carousel-title">Music Videos</h2>
          <Slider {...settings} className="video-carousel">
            {["NextTime", "Find_You", "Warp_Drive", "Running", "MidnightFlights", "1234", "After_Hours", "5am", "Iwaly", "Nexus", "Long_Term"].map((video) => (
              <div className="video-wrapper" key={video}>
                <video className="carousel-video" controls>
                  <source src={`/assets/videos/${video}.mp4`} type="video/mp4" />
                </video>
              </div>
            ))}
          </Slider>

          {/* 🎼 Sound Design */}
          <h2 className="carousel-title">Sound Design</h2>
          <Slider {...settings} className="video-carousel">
            {["Find_You", "Iwaly"].map((video) => (
              <div className="video-wrapper" key={video}>
                <video className="carousel-video" controls>
                  <source src={`/assets/videos/${video}.mp4`} type="video/mp4" />
                </video>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default Demo;

