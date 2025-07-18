import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getAnime, createWatchlist } from "../api";
import YouTube from "react-youtube";
import Header from "./Header";
import './Details.css'
import { getAllWatchlists } from "../api";
import { useTranslation } from "react-i18next";


export default function AnimeDetailFromHomePage() {
    const [anime, setAnime] = useState(null)
    const [error, setError] = useState(null)
    const [showTrailer, setShowTrailer] = useState(false); // <-- Add this
    const [watchlist, setWatchlist] = useState([])
    const { id } = useParams()
    const navigate = useNavigate();
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

    useEffect(() => {
        async function fetchAnime(){
            const anime = await getAnime(id)
            console.log(anime)
            if (anime instanceof Error) {
                setError(anime.message)
                return
            }
            setAnime(anime)
        }
        async function fetchWatchlist() {
            const list = await getAllWatchlists();
            setWatchlist(list)
        }
        fetchAnime()
        fetchWatchlist()
    }, [id])

    function getYouTubeVideoId(url) {
        const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    async function handleAddToWatchlist() {
        try {
            const alreadyInList = watchlist.some(item => item.title === anime.title);
            if (!alreadyInList) {
                await createWatchlist(anime);

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

    if (error) {
        return <h1>{error.message}</h1>
    }

    if (!anime) {
        return <h1>Loading...</h1>
    }

    return (
        <>
            <div className="page-container">
                <div className="details-container">
                    <div className="details-content">
                        <div className="details-image-section">
                            <img
                                src={anime.img_url}
                                alt={anime.title}
                                className="detail-image"
                            />
                        </div>
                        <div className="details-info-section">
                            <div>
                                <div className="details-title">{anime.title}</div>
                                <div className="details-meta-container">
                                    <div className="details-meta details-meta-column">
                                        <div>
                                            <span className="meta-label">{t("detailsfromhome.genre")}: </span>
                                            <span>{anime.genre}</span>
                                        </div>
                                        <div>
                                            <span className="meta-label">{t("detailsfromhome.rating")}: </span>
                                            <span className="rating-badge">{anime.rating}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="description-container">
                                    <h3>{t("detailsfromhome.description")}</h3>
                                    <div className="description-text">{anime.description}</div>
                                </div>
                            </div>
                            <div className="action-buttons">
                                <button
                                    className="play-button"
                                    onClick={() => setShowTrailer(true)}
                                >
                                    <span className="button-icon">▶️</span> {t("detailsfromhome.watchtrailer")}
                                </button>
                                <button
                                    className="watchlist-button"
                                    onClick={handleAddToWatchlist}
                                >
                                    <span className="button-icon">➕</span> {t("detailsfromhome.add")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showTrailer && (
                <div className="modal-overlay" onClick={() => setShowTrailer(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowTrailer(false)}>✖</button>
                        {anime.trailer ? (
                            <YouTube
                                videoId={getYouTubeVideoId(anime.trailer)}
                                opts={{
                                    height: "360",
                                    width: "640",
                                    playerVars: { autoplay: 1 },
                                }}
                            />
                        ) : (
                            <h3><b>NO TRAILER AVAILABLE</b></h3>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}
