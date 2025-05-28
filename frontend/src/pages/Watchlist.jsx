import { useState, useEffect } from "react";
import "./Watchlist.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {getAllWatchlists} from "../api.js"
import AnimeCard from "./Watchlist-card";

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
            <div className="nav-container" id="navContainer">
                <div className="header">
                    <div className="left-section">
                        <Link to='/' className="main-logo">
                            Kitsukeep
                        </Link>
                        <Link to="/Watchlist" className="menu-button">
                            Watchlist
                        </Link>

                        <a href="#" className="menu-button">
                            Playlists
                        </a>
                    </div>
                    <div className="right-section">
                        <a href="#">Some Stuff</a>
                        <div className="search-container">
                            <button className="search">
                                <span className="icon">🔍</span>
                            </button>
                        </div>
                        <button className="user-menu">
                            <span className="icon">👤</span>
                            USER
                            <span className="icon">▼</span>
                        </button>

                        <button className="language-button">
                            EN
                            <span className="icon">▼</span>
                        </button>
                    </div>
                </div>
            </div>
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
