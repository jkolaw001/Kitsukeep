import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getAnime } from "../api";
import { Link } from "react-router";
import { deleteAnimeFromWatchlist } from "../api";
import { createNote } from "../api";
import AddNote from "./AddNote";
import YouTube from "react-youtube";
import "./Home.css";
import Header from "./Header";
import NoteList from "./note-list";
import './Details.css'
import { useTranslation } from "react-i18next";

export default function AnimeDetailFromWatchlist() {

    const [anime, setAnime] = useState(null)
    const [error, setError] = useState(null)
    const [showTrailer, setShowTrailer] = useState(false);
    const { t, i18n } = useTranslation();
    const { id } = useParams()

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
        async function fetchAnime() {
            const anime = await getAnime(Number(id))
            if (anime instanceof Error) {
                setError(anime.message)
                return
            }
            setAnime(anime)
        }
        fetchAnime()
    }, [])

      function getYouTubeVideoId(url) {
        const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
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
                                        <section className="center-watch-trailer">
                                        <button
                                            className="play-button"
                                            onClick={() => setShowTrailer(true)}
                                        >
                                            <span className="button-icon">▶️</span> {t("detailsfromhome.watchtrailer")}
                                        </button>
                                        </section>
                                        <div className="note-center-items">
                                        <section className="center-watch-trailer">
                                        <NoteList id={id} />
                                         </section>
                                        <section>
                                        <Link to="/Watchlist">
                                        <button onClick={() => {
                                            deleteAnimeFromWatchlist(id)
                                            }}>Remove From Watchlist</button>
                                        </Link>
                                     </section>
                                     </div>
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
