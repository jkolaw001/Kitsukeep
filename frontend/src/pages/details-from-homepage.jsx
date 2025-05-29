import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getAnime } from "../api";
import { createWatchlist } from "../api";


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
            </section>
            <a href={anime.trailer}>Watch Trailer</a>
            <button onClick={async () => {await createWatchlist(anime); navigate("/watchlist")}}>Add To WatchList</button>
        </>
    )

}
