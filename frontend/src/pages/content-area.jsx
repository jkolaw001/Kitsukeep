import { useState, useEffect, useRef } from "react";
import "./content-area.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useUser } from "../loginpages/UserProvider.jsx";
import Header from "./Header.jsx";
import AnimeDetailFromHomePage from "./details-from-homepage.jsx";

function ContentArea() {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language
    ? i18n.language.toUpperCase().slice(0, 2)
    : "EN";

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

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleUserDropdownItemClick = () => {
    setIsUserDropdownOpen(false);
  };

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const handleScroll = (e) => {
    e.stopPropagation();
    checkScrollButtons();
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  const handleWheel = (e) => {
    if (scrollContainerRef.current) {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        scrollContainerRef.current.scrollLeft += e.deltaX;
      } else {
        e.preventDefault();
        scrollContainerRef.current.scrollLeft += e.deltaY * 0.5;
      }
    }
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
    if (anime.length > 0) {
      setTimeout(checkScrollButtons, 100);
    }
  }, [anime]);

  return (
    <>
      <div className="content-section">
        <h2 className="section-title">{t("contentarea.sectiontitle")}</h2>
        <p className="section-subtitle">{t("contentarea.sectionsubtitle")}</p>

        {loading && (
          <div className="loading-message">
            <p>Loading anime...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>Error loading anime: {error}</p>
          </div>
        )}

        {!loading && !error && anime.length === 0 && (
          <div className="no-anime-message">
            <p>No anime found. Add some anime to your database!</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="carousel-container">
              <button
                className={`scroll-arrow scroll-arrow-left ${!canScrollLeft ? 'disabled' : ''}`}
                onClick={scrollLeft}
                disabled={!canScrollLeft}
              >
                ←
              </button>

              <div
                className="poster-grid-container"
                ref={scrollContainerRef}
                onScroll={handleScroll}
                onWheel={handleWheel}
              >
                {anime.map((animeItem) => (
                  <Link
                    to={`/anime/${animeItem.id}`}
                    key={animeItem.id}
                    className="anime-poster-card"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src={animeItem.img_url}
                      alt={animeItem.title}
                      className="poster-img"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                      onLoad={(e) => {
                        e.target.style.opacity = "1";
                      }}
                      style={{ opacity: 0, transition: "opacity 0.3s ease" }}
                    />
                    <h3 className="poster-title">{animeItem.title}</h3>
                    <p className="poster-sub">{animeItem.genre}</p>
                  </Link>
                ))}
              </div>

              <button
                className={`scroll-arrow scroll-arrow-right ${!canScrollRight ? 'disabled' : ''}`}
                onClick={scrollRight}
                disabled={!canScrollRight}
              >
                →
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ContentArea;
