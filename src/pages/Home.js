import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import "../styles/Home.css";

function Home({ activeSection }) {
  const [titleText, setTitleText] = useState("");
  const [subtitleText, setSubtitleText] = useState("");
  const [activeCategory, setActiveCategory] = useState("Apps / Web Pages");

  useEffect(() => {
    const title = "Braeden Duval";
    const subtitle = "Software Developer & Audio Engineer";

    let titleIndex = 0;
    let subtitleIndex = 0;
    const titleSpeed = 80;
    const subtitleSpeed = 40;

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
      }
    }

    typeTitle();
    setTimeout(typeSubtitle, 1000);
  }, []);

  const categories = [
    {
      title: "Apps / Web Pages",
      items: [
        { title: "NotEFY Event Planner", image: "assets/pictures/preview.jpg" },
        { title: "Naruto Fan Page", image: "assets/pictures/preview.jpg" },
      ],
    },
    {
      title: "Music",
      items: [
        { title: "Next Time", image: "assets/pictures/preview.jpg" },
        { title: "Find You", image: "assets/pictures/preview.jpg" },
        { title: "Warp Drive", image: "assets/pitcture/preview.jpg" },
      ],
    },
    {
      title: "Sound Design",
      items: [
        { title: "Find You", image: "assets/pictures/preview.jpg" },
        { title: "Iwaly", image: "assets/pictures/preview.jpg" },
      ],
    },
    {
      title: "Games",
      items: [{ title: "Coming Soon", image: "assets/pictures/preview.jpg" }],
    },
  ];
  

  return (
    <>
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1 className="glow-title">{titleText}</h1>
          <p className="glow-subtitle">{subtitleText}</p>
        </div>
      </header>

      {/* Category Selector */}
      <div className="category-selector">
        {categories.map((category) => (
          <button
            key={category.title}
            className={`category-button ${activeCategory === category.title ? "active" : ""}`}
            onClick={() => setActiveCategory(category.title)}
          >
            {category.title}
          </button>
        ))}
      </div>

      {/* Portfolio Carousel */}
      <div className="carousel-container">
        {categories
          .filter((category) => category.title === activeCategory)
          .map((category, index) => (
            <div key={index} className="carousel-section">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={2}
                navigation
                pagination={{ clickable: true }}
                loop={category.items.length > 2}
                className="swiper-container"
                style={{ width: "90%", margin: "auto" }}
              >
                {category.items.map((item, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="carousel-item">
                      <img src={item.image} alt={item.title} className="carousel-image" />
                      <p className="carousel-text">{item.title}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ))}
      </div>
    </>
  );
}

export default Home;
