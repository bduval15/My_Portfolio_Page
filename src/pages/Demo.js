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

        {/* 🌍 Notefy: Web App */}
        <div className="webapp-container">
          <h2 className="carousel-title">NotEFY Live Preview</h2>
          <iframe
            src="https://notefy-39045.web.app/"
            className="webapp-iframe"
            title="Web App Preview"
          ></iframe>
        </div>
        
        {/* 🎬 Left Side: Videos */}
        <div className="video-container">
          <h2 className="carousel-title">Music Videos</h2>
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
          </Slider>

          <h2 className="carousel-title">Sound Design</h2>
          <Slider {...settings} className="video-carousel">
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
          </Slider>
        </div>

        
      </div>
    </section>
  );
}

export default Demo;
