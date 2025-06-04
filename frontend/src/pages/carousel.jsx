import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import "./Carousel.css";
import YouTube from "react-youtube";
import { getAnime, createWatchlist, getAllWatchlists } from "../api";
import { useTranslation } from "react-i18next";
import { Carousel } from "react-bootstrap";

function AnimeCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [loading, setLoading] = useState(false);
  const [anime, setAnime] = useState([]);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState({});
  const [showTrailer, setShowTrailer] = useState(false);
  const [watchlist, setWatchlist] = useState([]);
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language
    ? i18n.language.toUpperCase().slice(0, 2)
    : "EN";

  const toggleLanguageDropdown = () =>
    setIsLanguageDropdownOpen((open) => !open);

  const handleLanguageChange = (language) => {
    const languageCode = language.toLowerCase();
    i18n.changeLanguage(languageCode);
    setIsLanguageDropdownOpen(false);
  };

  const languages = [
    { code: "EN", name: "English" },
    { code: "ES", name: "Español" },
    { code: "JA", name: "日本語" },
    { code: "KO", name: "한국어" },
  ];

  const navigate = useNavigate();

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleUserDropdownItemClick = () => {
    setIsUserDropdownOpen(false);
  };

  const handleImageLoad = (animeId) => {
    setImageLoaded((prev) => ({ ...prev, [animeId]: true }));
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

  useEffect(() => {
    async function fetchWatchlist() {
      const list = await getAllWatchlists();
      setWatchlist(list);
    }
    fetchWatchlist();
  }, []);

  function getYouTubeVideoId(url) {
    const regex =
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  async function handleAddToWatchlist(animeSlide) {
    try {
      const alreadyInList = watchlist.some(
        (item) => item.title === animeSlide.title
      );
      if (!alreadyInList) {
        const animeForAPI = {
          title: animeSlide.title,
          description: animeSlide.description || "No description available",
          genre: animeSlide.genre || "Unknown",
          rating: animeSlide.rating || "Not rated",
          img_url: animeSlide.image,
          trailer: animeSlide.trailer || null,
          mal_id: animeSlide.mal_id || animeSlide.id,
        };

        console.log("Adding anime to watchlist:", animeForAPI);
        const result = await createWatchlist(animeForAPI);
        console.log("Watchlist creation result:", result);

        const updatedWatchlist = await getAllWatchlists();
        setWatchlist(updatedWatchlist);

        alert("Anime added to watchlist successfully!");
        navigate("/watchlist");
      } else {
        alert("Anime is already in your watchlist!");
      }
    } catch (error) {
      console.error("Error adding to watchlist:", error);
      alert("Failed to add anime to watchlist. Please try again.");
    }
  }

  const animeSlides = anime.slice(0, 5).map((a) => ({
    id: a.id,
    mal_id: a.mal_id,
    title: a.title,
    image: a.img_url,
    rating: a.rating,
    episodes: a.episodes,
    description: a.description,
    genre: a.genre,
    trailer: a.trailer,
  }));

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % animeSlides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, animeSlides.length]);

  const gotoSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % animeSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + animeSlides.length) % animeSlides.length
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  if (loading) {
    return (
      <div className="carousel-loading">
        <div className="carousel-loading-text">Loading...</div>
      </div>
    );
  }

  return (
    <div className="carousel-container full-width-carousel">
      <div className="carousel-wrapper">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {animeSlides.map((anime, index) => (
            <div key={anime.id} className="carousel-slide">
              <div className="slide-background">
                <div
                  className="slide-image"
                  style={{
                    backgroundImage: `url(${anime.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    inset: 0,
                    opacity: imageLoaded[anime.id] ? 1 : 0.8,
                    transition: "opacity 0.3s ease",
                  }}
                />

                <img
                  src={anime.image}
                  alt=""
                  style={{ display: "none" }}
                  onLoad={() => handleImageLoad(anime.id)}
                />
                <div className="slide-overlay">
                  <div className="overlay-image">
                    <img src={anime.image} />
                  </div>
                </div>
              </div>

              <div className="slide-content">
                <div className="slide-content-inner">
                  <div className="slide-info">
                    <h1 className="slide-title">{anime.title}</h1>

                    <div className="slide-meta">
                      <div className="meta-rating">
                        <span className="meta-star">★</span>
                        <span className="meta-score">{anime.rating}</span>
                      </div>
                    </div>

                    <div className="slide-genre"> {t("carousel.genre")}: {anime.genre}</div>

                    <div className="slide-buttons">
                      <a
                        href={anime.trailer}
                        className="btn-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg
                          className="btn-icon"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        {t("carousel.watchTrailer")}
                      </a>
                      <button
                        className="btn-secondary"
                        onClick={() => handleAddToWatchlist(anime)}
                      >
                        <svg
                          className="btn-icon"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        {t("carousel.add")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {showTrailer && (
            <div
              className="modal-overlay"
              onClick={() => setShowTrailer(false)}
            >
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="modal-close"
                  onClick={() => setShowTrailer(false)}
                >
                  ✖
                </button>
                {animeSlides[currentSlide].trailer ? (
                  <YouTube
                    videoId={getYouTubeVideoId(
                      animeSlides[currentSlide].trailer
                    )}
                    opts={{
                      height: "360",
                      width: "640",
                      playerVars: { autoplay: 1 },
                    }}
                  />
                ) : (
                  <h3>
                    <b>NO TRAILER AVAILABLE</b>
                  </h3>
                )}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={prevSlide}
          className="carousel-arrow carousel-arrow-left"
        >
          <svg
            className="arrow-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="carousel-arrow carousel-arrow-right"
        >
          <svg
            className="arrow-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <div className="carousel-indicators">
          {animeSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => gotoSlide(index)}
              className={`carousel-dot ${
                index === currentSlide ? "active" : ""
              }`}
            />
          ))}
        </div>

        <div className="carousel-progress-container">
          <div
            className={`carousel-progress-bar ${
              isAutoPlaying ? "animated" : ""
            }`}
            style={{
              width: isAutoPlaying ? "100%" : "0%",
              animationDuration: isAutoPlaying ? "6s" : "0s",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default AnimeCarousel;
