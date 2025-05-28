import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getAnime } from "../api";
import { Link } from "react-router";
import { deleteAnimeFromWatchlist } from "../api";
import { createNote } from "../api";
import NoteList from "./note-list";
import AddNote from "./AddNote";

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
                <a href={anime.trailer}>Watch Trailer</a>
                <NoteList />
                <AddNote />
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
