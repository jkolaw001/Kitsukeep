import { Link } from "react-router";
import "./Watchlist.css";

export default function AnimeCard({ anime }) {
  return (
      <Link className="anime-item-link" to={`/anime/Watchlist/${anime.anime_id}`}>
          <div className="card-image">
            <img className="anime-poster-image"src={anime.img_url} alt={anime.title} />
          </div>
          <h3 className="anime-title-text">{anime.title}</h3>
          <p className="anime-subtitle-text">{anime.genre}</p>
      </Link>

  );
}
