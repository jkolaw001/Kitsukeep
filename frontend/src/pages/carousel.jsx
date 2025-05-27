import { useState, useEffect } from "react";
import "./Carousel.css"
import placeholderImg from "../assets/placeholder.jpg"

function AnimeCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIisAutoPlaying] = useState(true);

  const animeSlides = [
    {
      id: 1,
      title: "title here",
      image: placeholderImg,
      rating: "rating-here",
    },
    {
      id: 2,
      title: "title here",
      image: placeholderImg,
      rating: "rating-here",
    },
    {
      id: 3,
      title: "title here",
      image: placeholderImg,
      rating: "rating-here",
    },
    {
      id: 4,
      title: "title here",
      image: placeholderImg,
      rating: "rating-here",
    },
    {
      id: 5,
      title: "title here",
      image: placeholderImg,
      rating: "rating-here",
    },
  ];

 useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % animeSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, animeSlides.length]);

  const gotoSlide = (index) => {
    setCurrentSlide(index);
    setIisAutoPlaying(false);
    setTimeout(() => setIisAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % animeSlides.length);
    setIisAutoPlaying(false);
    setTimeout(() => setIisAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + animeSlides.length) % animeSlides.length
    );
    setIisAutoPlaying(false);
    setTimeout(() => setIisAutoPlaying(true), 10000);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
            transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          {animeSlides.map((anime, index) => (
            <div key={anime.id} className="carousel-slide">
              <div className="slide-background">
                <img
                  src={anime.image}
                  alt={anime.title}
                  className="slide-image"
                />
                <div className="slide-overlay"></div>
              </div>
              <div className="slide-content">
                <div className="slide-info">
                  <h1 className="slide-title">{anime.title}</h1>
                  <div className="slide-meta">
                    <span className="rating">⭐ {anime.rating}</span>
                    <span className="episodes">{anime.episodes} something here</span>
                  </div>
                  <p className="slide-description">{anime.description}</p>
                  <div className="slide-buttons">
                    <button className="play-button">▶️ Watch Trailer</button>
                    <button className="info-button">ℹ️ More Info</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-arrow carousel-arrow-left"
          onClick={prevSlide}
        >
          ‹
        </button>
        <button
          className="carousel-arrow carousel-arrow-right"
          onClick={nextSlide}
        >
          ›
        </button>
        <div className="carousel-dots">
          {animeSlides.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => gotoSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnimeCarousel;
