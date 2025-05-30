import { Link } from "react-router";
import "./Watchlist.css";

export default function AnimeCard({ anime }) {
  return (
    <Link className="card" to={`/anime/Watchlist/${anime.anime_id}`}>
        <div className="card-image">
          <img src={anime.img_url} alt={anime.title} />
        </div>
        <div className="card-content">
          <h3 className="card-title">{anime.title}</h3>
        </div>
    </Link>
  );
}
