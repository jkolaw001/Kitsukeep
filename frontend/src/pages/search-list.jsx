import { useState } from "react";
import { Link } from "react-router";

export default function AnimeResults({ query }) {

    const animeCards = query.map((anime) => {
        return (
            <Link to={`/anime/search/${anime.mal_id}`} key={anime.mal_id} className="card-link">
                <div className="card">
                    {anime.img_url && (
                        <div className="card-image">
                            <img
                                src={anime.img_url}
                                alt={anime.title}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        </div>
                    )}
                    <div className="card-content">
                        <h3 className="card-title">{anime.title}</h3>
                    </div>
                </div>
            </Link>
        )
    })

    return <animeCards />
}
