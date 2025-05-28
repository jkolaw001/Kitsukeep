import { useState, useEffect } from "react";
import "./Watchlist.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAllWatchlists } from "../api.js"
import AnimeCard from "./Watchlist-card";
import Header from "./Header.jsx";

function WatchlistPage() {
    const [anime, setAnime] = useState([])
    const [error, setError] = useState(null)
    const navigate = useNavigate()


    useEffect(() => {
        async function fetchAnime() {
            const anime = await getAllWatchlists()
            if (anime instanceof Error) {
                setError(anime)
                return
            }
            setAnime(anime)
        }
        fetchAnime()
    }, [])

    if (error) {
        return <h1>{error.message}</h1>
    }
    const animeCards = anime.map((anime) => {
        return <AnimeCard key={anime.id} anime={anime} />
    })



    return (
        <>
            <Header />
            <div className="watchlist-container">
                <h1>| My Watchlist |</h1>
            </div>
            <div className="anime-cards">
                <div>{animeCards}</div>
            </div>
        </>
    );
}

export default WatchlistPage;
