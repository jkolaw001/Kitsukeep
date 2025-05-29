import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getAnime } from "../api";
import { Link } from "react-router";
import { deleteAnimeFromWatchlist } from "../api";
import { createNote } from "../api";
import NoteList from "./note-list";
import AddNote from "./AddNote";
import YouTube from "react-youtube";

export default function AnimeDetailFromWatchlist() {

    const [anime, setAnime] = useState(null)
    const [error, setError] = useState(null)
    const { id } = useParams()


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
            <section className="anime-detail">
                <img src={anime.img_url} alt={anime.title} />
                <h1>{anime.title}</h1>
                <p>{anime.genre}</p>
                <p>{anime.rating}</p>
                <p>{anime.description}</p>
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
                <NoteList id={id} />
            </section>
            <section>
                <Link to="/Watchlist">
                    <button onClick={() => {
                        deleteAnimeFromWatchlist(id)
                    }}>Remove From Watchlist</button>
                </Link>
            </section>
        </>
    )

}
