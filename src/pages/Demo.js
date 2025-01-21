import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/Demo.css"; // Keep your custom styles

function Demo() {
  // Slick carousel settings
  const settings = {
    dots: true,          // Show navigation dots
    infinite: true,     // Disable infinite looping
    speed: 500,         // Transition speed
    slidesToShow: 1,    // Show one video at a time
    slidesToScroll: 1,  // Scroll one video at a time
    autoplay: false,     // Disable auto-rotation
    arrows: true,        // Keep navigation arrows
    draggable: true,     // Allow manual dragging
    swipe: true,         // Enable swiping on touch devices
    pauseOnHover: true,  // Prevent unwanted changes when hovering
  };

  return (
    <section className="demo-section">
      <h2 className="section-title">Live Demos</h2>
      <p>Here are some interactive demos of my projects:</p>

      {/* Video Carousel */}
      <Slider {...settings} className="video-carousel">
        <div className="video-wrapper">
          <video className="carousel-video" controls>
            <source src="/assets/videos/5am.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="video-wrapper">
          <video className="carousel-video" controls>
            <source src="/assets/videos/1234.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="video-wrapper">
          <video className="carousel-video" controls>
            <source src="/assets/videos/After_Hours.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="video-wrapper">
          <video className="carousel-video" controls>
            <source src="/assets/videos/Find_You.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="video-wrapper">
          <video className="carousel-video" controls>
            <source src="/assets/videos/Iwaly.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="video-wrapper">
          <video className="carousel-video" controls>
            <source src="/assets/videos/Long_Term.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="video-wrapper">
          <video className="carousel-video" controls>
            <source src="/assets/videos/MidnightFlights.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="video-wrapper">
          <video className="carousel-video" controls>
            <source src="/assets/videos/NextTime.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="video-wrapper">
          <video className="carousel-video" controls>
            <source src="/assets/videos/Nexus.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="video-wrapper">
          <video className="carousel-video" controls>
            <source src="/assets/videos/Running.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="video-wrapper">
          <video className="carousel-video" controls>
            <source src="/assets/videos/Warp_Drive.mp4" type="video/mp4" />
          </video>
        </div>
      </Slider>
    </section>
  );
}

export default Demo;
