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
        return <h1>{error.message} Hi</h1>
    }
    const animeCards = anime.map((anime) => {
        return <AnimeCard key={anime.id} anime={anime} />
    })



    return (
        <>
            <div className="watchlist-header-section">
                <h1 className="watchlist-title">Your Keep</h1>
            </div>
            <div>
                <div className="anime-grid-layout">{animeCards}</div>
            </div>
        </>
    );
}

export default WatchlistPage;
