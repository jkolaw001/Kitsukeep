import { useState } from "react";
import { useNavigate } from "react-router";

export default function AnimeSearch() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    function handleSearch(e) {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search/${encodeURIComponent(query.trim())}`);
        }
    }

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search anime by name"
                />
                <button type="submit">🔍</button>
            </form>
        </div>
    );


}
