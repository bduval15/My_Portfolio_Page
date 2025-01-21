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
      <h1 className="page-title"></h1>

      {/* Container for side-by-side carousels */}
      <div className="carousel-container">
        {/* Music Video Carousel */}
        <div className="carousel-box">
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

        {/* Sound Design Carousel */}
        <div className="carousel-box">
          <h2 className="carousel-title">Sound Design</h2>
          <Slider {...settings} className="video-carousel">
            <div className="video-wrapper">
              <video className="carousel-video" controls>
                <source src="/assets/videos/sound1.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="video-wrapper">
              <video className="carousel-video" controls>
                <source src="/assets/videos/sound2.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="video-wrapper">
              <video className="carousel-video" controls>
                <source src="/assets/videos/sound3.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="video-wrapper">
              <video className="carousel-video" controls>
                <source src="/assets/videos/sound4.mp4" type="video/mp4" />
              </video>
            </div>
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default Demo;
