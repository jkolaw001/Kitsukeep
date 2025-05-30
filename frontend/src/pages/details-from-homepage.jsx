import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getAnime, createWatchlist } from "../api";
import YouTube from "react-youtube";
import Header from "./Header";
import './Details.css'
import { getAllWatchlists } from "../api";

export default function AnimeDetailFromHomePage() {
    const [anime, setAnime] = useState(null)
    const [error, setError] = useState(null)
    const [showTrailer, setShowTrailer] = useState(false); // <-- Add this
    const [watchlist, setWatchlist] = useState([])
    const { id } = useParams()
    const navigate = useNavigate();

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
        const alreadyInList = watchlist.some(item => item.title === anime.title);
        if (!alreadyInList) {
            await createWatchlist(anime);
            navigate("/watchlist");
        } else {
            alert("Anime is already in your watchlist!");
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
                                    <span className="button-icon">▶️</span> Watch Trailer
                                </button>
                                <button
                                    className="watchlist-button"
                                    onClick={async () => {
                                        await createWatchlist(anime);
                                        navigate("/watchlist");
                                    }}
                                >
                                    <span className="button-icon">➕</span> Add To WatchList
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
            <section className="anime-detail">
                <img src={anime.img_url} alt={anime.title} />
                <h1>{anime.title}</h1>
                <p>{anime.genre}</p>
                <p>{anime.rating}</p>
                <p>{anime.description}</p>
            </section>
             {anime.trailer ? (
                    <YouTube
                        videoId={getYouTubeVideoId(anime.trailer)}
                        opts={{
                            height: "360",
                            width: "640",
                            playerVars: {
                                autoplay: 0,
                            },
                        }}
                    />
                ) : (
                    <h3><b>NO TRAILER AVAILABLE</b></h3>
                )}
            <button onClick={handleAddToWatchlist}>Add To WatchList</button>

        </>
    )
}
