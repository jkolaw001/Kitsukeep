import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAnimeResults } from "../api";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./SearchResults.css";

export default function SearchResultsPage() {
    const { query } = useParams();
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const { t, i18n } = useTranslation();

    const currentLanguage = i18n.language
    ? i18n.language.toUpperCase().slice(0, 2)
    : "EN";

    const toggleLanguageDropdown = () =>
    setIsLanguageDropdownOpen((open) => !open);

    const handleLanguageChange = (language) => {
    const languageCode = language.toLowerCase();
    i18n.changeLanguage(languageCode);
    setIsLanguageDropdownOpen(false);
  };

  const languages = [
    { code: "EN", name: "English" },
    { code: "ES", name: "Español" },
    { code: "JA", name: "日本語" },
    { code: "KO", name: "한국어" },
  ];

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
            <div className="search-results-header">
                <h2>{t("searchresults.title")} "{query}"</h2>
            </div>
            <div className="search-results-grid">
                {results.map((anime) => (
                    <Link key={anime.mal_id} to={`/anime/search/${anime.mal_id}`} className="search-result-link">
                        <div className="search-result-card">
                            <img
                                src={anime.img_url}
                                alt={anime.title}
                                className="search-result-image"
                            />
                            <h3 className="search-result-title">{anime.title}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
