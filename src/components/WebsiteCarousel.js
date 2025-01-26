import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/Carousel.css";

function WebsiteCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {/* Slide 1 - Naruto Web Page */}
        <div className="slide">
          <h2 className="carousel-title">Naruto Web Page</h2>
          <p className="carousel-description">
            Explore the immersive Naruto-themed website with animations and interactivity.
          </p>
          <img src="/assets/naruto-preview.png" alt="Naruto Web Page Preview" className="carousel-image" />
        </div>

        {/* Slide 2 - NotEFY Web Page */}
        <div className="slide">
          <h2 className="carousel-title">NotEFY Web Page</h2>
          <p className="carousel-description">
            Discover and join events with a sleek, futuristic NotEFY design.
          </p>
          <img src="/assets/notefy-preview.png" alt="NotEFY Web Page Preview" className="carousel-image" />
        </div>
      </Slider>
    </div>
  );
}

export default WebsiteCarousel;
