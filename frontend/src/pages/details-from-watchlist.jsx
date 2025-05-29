import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getAnime } from "../api";
import { deleteAnimeFromWatchlist } from "../api";
import { createNote } from "../api";
import AddNote from "./AddNote";

export default function AnimeDetailFromHomePage(){

    const [anime, setAnime] = useState(null)
    const [error, setError] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        async function fetchAnime(id){
            const anime = await getAnime(id)
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
                <AddNote />
            </section>
            <section>
                <button onClick={deleteAnimeFromWatchlist(id)}>Remove From Watchlist</button>
            </section>
        </>
    )

}
