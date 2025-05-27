import { useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import WatchlistPage from "./Watchlist.jsx";
import Login from "../loginpages/Login.jsx";
import Logout from "../loginpages/Logout.jsx";
import Signup from "../loginpages/Signup.jsx";
import AnimeCarousel from "./carousel.jsx";

function HomePage() {
  const [ isUserDropdownOpen, setIsUserDropdownOpen ] = useState(false);

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleUserDropdownItemClick = () => {
    setIsUserDropdownOpen(false)
  };

  return (
    <>
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
                USER
                <span className="icon">▼</span>
              </button>

              {isUserDropdownOpen && (
                <div className="dropdown-menu">
                  <Link to='/Logout' className="dropdown-item" onClick={handleUserDropdownItemClick}>
                    Logout
                  </Link>
                  <Link to='/Signup' className="dropdown-item" onClick={handleUserDropdownItemClick}>Something Here</Link>
                  <Link to='/Login' className="dropdown-item" onClick={handleUserDropdownItemClick}>Something Here</Link>

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

      <div className="anime-carousel-container">
          <AnimeCarousel />
      </div>


      <div className="anime-cards">
        <div className="card">
          <h3 className="card-title">Anime 1</h3>
          <p className="card-description">Anime name and a few info</p>
        </div>
        <div className="card">
          <h3 className="card-title">Anime 2</h3>
          <p className="card-description">Anime name and a few info</p>
        </div>
        <div className="card">
          <h3 className="card-title">Anime 3</h3>
          <p className="card-description">Anime name and a few info</p>
        </div>
        <div className="card">
          <h3 className="card-title">Anime 4</h3>
          <p className="card-description">Anime name and a few info</p>
        </div>
        <div className="card">
          <h3 className="card-title">Anime 5</h3>
          <p className="card-description">Anime name and a few info</p>
        </div>
        <div className="card">
          <h3 className="card-title">Anime 6</h3>
          <p className="card-description">Anime name and a few info</p>
        </div>
        <div className="card">
          <h3 className="card-title">Anime 7</h3>
          <p className="card-description">Anime name and a few info</p>
        </div>
        <div className="card">
          <h3 className="card-title">Anime 8</h3>
          <p className="card-description">Anime name and a few info</p>
        </div>
        <div className="card">
          <h3 className="card-title">Anime 9</h3>
          <p className="card-description">Anime name and a few info</p>
        </div>
        <div className="card">
          <h3 className="card-title">Anime 10</h3>
          <p className="card-description">Anime name and a few info</p>
        </div>
        <div className="card">
          <h3 className="card-title">Anime 11</h3>
          <p className="card-description">Anime name and a few info</p>
        </div>
        <div className="card">
          <h3 className="card-title">Anime 12</h3>
          <p className="card-description">Anime name and a few info</p>
        </div>
        <div className="card">
          <h3 className="card-title">Anime 13</h3>
          <p className="card-description">Anime name and a few info</p>
        </div>
        <div className="card">
          <h3 className="card-title">Anime 14</h3>
          <p className="card-description">Anime name and a few info</p>
        </div>
        <div className="card">
          <h3 className="card-title">Anime 1</h3>
          <p className="card-description">Anime name and a few info</p>
        </div>
      </div>
    </>
  );
}

export default HomePage;
