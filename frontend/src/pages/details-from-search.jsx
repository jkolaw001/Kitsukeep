import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getAnimeResultsById } from "../api";
import { createWatchlist } from "../api";
import YouTube from "react-youtube";
import './Details.css'
import './details-from-search.css'
import { useTranslation } from "react-i18next";


export default function AnimeDetailFromSearch() {

    const [anime, setAnime] = useState(null)
    const [error, setError] = useState(null)
    const { mal_id } = useParams()
    const navigate = useNavigate();
    const [showTrailer, setShowTrailer] = useState(false)
    const { t, i18n } = useTranslation()


    useEffect(() => {
        async function fetchAnime() {
            const anime = await getAnimeResultsById(mal_id)
            console.log(anime)
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
                                            <span className="meta-label">Genre: </span>
                                            <span>{anime.genre}</span>
                                        </div>
                                        <div>
                                            <span className="meta-label">Rating: </span>
                                            <span className="rating-badge">{anime.rating}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="description-container">
                                    <h3>Description</h3>
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
                                    onClick={async () => {
                                        await createWatchlist(anime);
                                        navigate("/watchlist");
                                    }}
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
