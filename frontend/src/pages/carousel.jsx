import { useState, useEffect } from "react";
import "./Carousel.css";
import placeholderImg from "../assets/placeholder.jpg";

function AnimeCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIisAutoPlaying] = useState(true);
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleUserDropdownItemClick = () => {
    setIsUserDropdownOpen(false);
  };

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/api/anime", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setAnime(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching animes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimes();
  }, []);

  const animeSlides = anime.slice(0, 5).map((a) => ({
    id: a.id,
    title: a.title,
    image: a.img_url,
    rating: a.rating,
    episodes: a.episodes,
    description: a.description,
  }));

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
                <div className="slide-overlay">
                  <div className="overlay-image">
                    <img
                    src={anime.image}/>
                  </div>
                </div>
              </div>
              <div className="slide-content">
                <div className="slide-info">
                  <h1 className="slide-title">{anime.title}</h1>
                  <div className="slide-meta">
                    <span className="rating">⭐ {anime.rating}</span>

                  </div>
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
              className={`carousel-dot ${
                index === currentSlide ? "active" : ""
              }`}
              onClick={() => gotoSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnimeCarousel;
