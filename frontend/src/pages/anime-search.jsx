import { useState } from "react";
import { getAnimeResults } from "../api";
import { Link } from "react-router";

export default function AnimeSearch() {
    const [query, setQuery] = useState([])
    const [error, setError] = useState(null)

    async function submitSearch(e) {
        e.preventDefault()
        const formData = new FormData(e.target)

        const search = formData.get("query")
        if (!search || typeof search !== "string") {
            setError("Invalid Search")
            return;
        }

        const searchResults = await getAnimeResults({ search })
        if (searchResults instanceof Error) {
            setError("Couldn't search title, please try again later")
            return
        }
        setQuery(searchResults)
    }

    return (
        <div>
            <form onSubmit={submitSearch}>
                <input type="text" id="query" name="query" placeholder="Search for anime" required={true} />

                <Link to={"/search-results"}><button type="submit">🔍</button></Link>
            </form>

        </div>
    )
}
