import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAnimeResults } from "../api";
import { Link } from "react-router-dom";

export default function SearchResultsPage() {
    const { query } = useParams();
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const data = await getAnimeResults(query);
            if (data instanceof Error) {
                setError(data.message);
            } else {
                setResults(data);
                setError(null);
            }
        }
        fetchData();
    }, [query]);

    if (error) return <p><b>Error: Sorry, no anime with that title was found.</b></p>;
    if (!results.length) return <p>Loading or no results...</p>;

    return (
        <div>
            <h1>Results for "{query}"</h1>
            {results.map((anime) => (
                <Link to={`/anime/search/${anime.mal_id}`}>
                    <div className="card">
                        <img src={anime.image_url} alt={anime.title} width="100" />
                        <h3>{anime.title}</h3>
                    </div>
                </Link>
            ))}
        </div>
    );
}
