import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../loginpages/UserProvider.jsx";
import "../pages/Home.css";
import { useTranslation } from "react-i18next";

export default function Header() {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const { user } = useUser();
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language ? i18n.language.toUpperCase().slice(0, 2) : "EN";

  const toggleUserDropdown = () => setIsUserDropdownOpen((open) => !open);
  const toggleLanguageDropdown = () =>
    setIsLanguageDropdownOpen((open) => !open);

  const handleUserDropdownItemClick = () => setIsUserDropdownOpen(false);
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

  return (
    <div className="nav-container" id="navContainer">
      <div className="header">
        <div className="left-section">
          <Link to="/" className="main-logo">
            {t('header.logo')}
          </Link>
          <Link to="/Watchlist" className="menu-button">
            {t('header.watchlist')}
          </Link>
          <a href="#" className="menu-button">
            {t('header.playlists')}
          </a>
        </div>
        <div className="right-section">
          <a href="#">{t('header.someStuff')}</a>
          <div className="search-container">
            <button className="search">
              <span className="icon"> {t('header.search')} 🔍</span>
            </button>
          </div>
          <div className="user-dropdown-container">
            <button className="user-menu" onClick={toggleUserDropdown}>
              <span className="icon">👤</span>
              {user ? user.username : "USER"}
              <span className="icon">▼</span>
            </button>
            {isUserDropdownOpen && (
              <div className="dropdown-menu">
                <Link
                  to="/Logout"
                  className="dropdown-item"
                  onClick={handleUserDropdownItemClick}
                >
                   {t('header.logout')}
                </Link>
                <Link
                  to="/Signup"
                  className="dropdown-item"
                  onClick={handleUserDropdownItemClick}
                >
                  {t('header.signup')}

                </Link>
                <Link
                  to="/Login"
                  className="dropdown-item"
                  onClick={handleUserDropdownItemClick}
                >
                  {t('header.login')}
                </Link>
              </div>
            )}
          </div>
          <div className="language-dropdown-container">
            <button
              className="language-button"
              onClick={toggleLanguageDropdown}
            >
              Lang: {currentLanguage}
              <span className="icon">▼</span>
            </button>
            {isLanguageDropdownOpen && (
              <div className="dropdown-menu language-dropdown">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`dropdown-item ${
                      currentLanguage === lang.code ? "active" : ""
                    }`}
                    onClick={() => handleLanguageChange(lang.code)}
                  >
                    {lang.code}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
