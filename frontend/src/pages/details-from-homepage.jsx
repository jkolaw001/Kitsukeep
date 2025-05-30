import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getAnime } from "../api";
import { createWatchlist } from "../api";
import YouTube from "react-youtube";
import Header from "./Header";
import './Details.css'

export default function AnimeDetailFromHomePage(){

    const [anime, setAnime] = useState(null)
    const [error, setError] = useState(null)
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
            <Header />
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
                                <a className="play-button" href={anime.trailer} target="_blank" rel="noopener noreferrer">
                                    <span className="button-icon">▶️</span>  Watch Trailer
                                </a>
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
            <button onClick={async () => {await createWatchlist(anime); navigate("/watchlist")}}>Add To WatchList</button>

        </>
    )

}
