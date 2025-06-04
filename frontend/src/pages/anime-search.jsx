import { useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";


export default function AnimeSearch() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
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
                    placeholder={t("AnimeSearch.search")}
                />
                <button type="submit" className="anime-search-button">🔍</button>
            </form>
        </div>
    );


}
