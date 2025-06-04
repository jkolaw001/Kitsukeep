import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAnimeResults } from "../api";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";


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
            <h1>{t("searchresults.title")} {query}</h1>
            {results.map((anime) => (
                <Link to={`/anime/search/${anime.mal_id}`}>
                    <div className="card">
                        <img src={anime.img_url} alt={anime.title} width="100" />
                        <h3>{anime.title}</h3>
                    </div>
                </Link>
            ))}
        </div>
    );
}
