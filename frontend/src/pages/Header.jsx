import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../loginpages/UserProvider.jsx";
import "../pages/Home.css";

export default function Header() {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { user } = useUser();

  const toggleUserDropdown = () => setIsUserDropdownOpen((open) => !open);
  const handleUserDropdownItemClick = () => setIsUserDropdownOpen(false);

  return (
    <div className="nav-container" id="navContainer">
      <div className="header">
        <div className="left-section">
          <Link to="/" className="main-logo">
            Kitsukeep
          </Link>
          <Link to="/Watchlist" className="menu-button">
            Watchlist
          </Link>
          <a href="#" className="menu-button">
            Playlists
          </a>
        </div>
        <div className="right-section">
          <a href="#">Some Stuff</a>
          <div className="search-container">
            <button className="search">
              <span className="icon">🔍</span>
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
                <Link to="/Logout" className="dropdown-item" onClick={handleUserDropdownItemClick}>
                  Logout
                </Link>
                <Link to="/Signup" className="dropdown-item" onClick={handleUserDropdownItemClick}>
                  Signup
                </Link>
                <Link to="/Login" className="dropdown-item" onClick={handleUserDropdownItemClick}>
                  Login
                </Link>
              </div>
            )}
          </div>
          <button className="language-button">
            EN
            <span className="icon">▼</span>
          </button>
        </div>
      </div>
    </div>
  );
}
