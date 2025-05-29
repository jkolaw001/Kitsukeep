import { Link } from 'react-router'
import './Watchlist.css'

export default function AnimeCard({anime}) {
    return (
        <Link className='card' to={`/anime/Watchlist/${anime.anime_id}`}>
            <img src={anime.img_url} alt={anime.title} />
        </Link>
    )
}
