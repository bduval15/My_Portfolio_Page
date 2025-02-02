// src/components/websitecarousel.js
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/Carousel.css";

function WebsiteCarousel({ items, categoryKey }) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={20}
      slidesPerView={2}
      navigation
      pagination={{ clickable: true }}
      loop={items.length > 2}
      className="swiper-container"
    >
      {items.map((item, idx) => (
        <SwiperSlide key={idx}>
          {/* Link to the Demo page with the category query param */}
          <a href={`/demo?cat=${categoryKey}`}>
            <div className="carousel-item">
              <img src={item.image} alt={item.title} className="carousel-image" />
              <p className="carousel-text">{item.title}</p>
            </div>
          </a>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default WebsiteCarousel;
