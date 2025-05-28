import { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import WatchlistPage from "./Watchlist.jsx";
import Login from "../loginpages/Login.jsx";
import Logout from "../loginpages/Logout.jsx";
import Signup from "../loginpages/Signup.jsx";
import AnimeCarousel from "./carousel.jsx";
import { useUser } from "../loginpages/UserProvider.jsx";

function HomePage() {
  const [ isUserDropdownOpen, setIsUserDropdownOpen ] = useState(false);
  const [ anime, setAnime] = useState([])
  const [loading, setLoading] = useState(true);
  const [ error, setError] = useState(null);
  const { user } = useUser();

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleUserDropdownItemClick = () => {
    setIsUserDropdownOpen(false)
  };

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://127.0.0.1:8000/api/anime', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setAnime(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching animes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimes();
  }, []);


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
                {user ? user.username : "USER"}
                <span className="icon">▼</span>
              </button>

              {isUserDropdownOpen && (
                <div className="dropdown-menu">
                  <Link to='/Logout' className="dropdown-item" onClick={handleUserDropdownItemClick}>
                    Logout
                  </Link>
                  <Link to='/Signup' className="dropdown-item" onClick={handleUserDropdownItemClick}>Signup</Link>
                  <Link to='/Login' className="dropdown-item" onClick={handleUserDropdownItemClick}>Login</Link>

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
        {loading && (
          <div className="loading-message">
            <p>Loading anime...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>Error loading anime: {error}</p>
          </div>
        )}

        {!loading && !error && anime.length === 0 && (
          <div className="no-anime-message">
            <p>No anime found. Add some anime to your database!</p>
          </div>
        )}

        {!loading && !error && anime.map((anime) => (
          <div key={anime.id} className="card">
            {anime.img_url && (
              <div className="card-image">
                <img
                  src={anime.img_url}
                  alt={anime.title}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
            <div className="card-content">
              <h3 className="card-title">{anime.title}</h3>

            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default HomePage;
