import { useState, useEffect } from "react";
import "./Watchlist.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAllWatchlists } from "../api.js";
import AnimeCard from "./Watchlist-card";
import Header from "./Header.jsx";
import { useTranslation } from "react-i18next";

function WatchlistPage() {
  const [anime, setAnime] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
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

  useEffect(() => {
    async function fetchAnime() {
      const anime = await getAllWatchlists();
      if (anime instanceof Error) {
        setError(anime);
        return;
      }
      setAnime(anime);
    }
    fetchAnime();
  }, []);

  if (error) {
    return <h1>{error.message} Hi</h1>;
  }
  const animeCards = anime.map((anime) => {
    return <AnimeCard key={anime.id} anime={anime} />;
  });

  return (
    <>
      <div className="watchlist-header-section">
        <h2>{t("watchlist.title")}</h2>
      </div>
      <div>
        <div className="anime-grid-layout">{animeCards}</div>
      </div>
    </>
  );
}

export default WatchlistPage;
