import { useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import WatchlistPage from "./Watchlist.jsx";
import Login from "../loginpages/Login.jsx";
import Logout from '../loginpages/Logout.jsx'
import Signup from '../loginpages/Signup.jsx'

function HomePage() {
  return (
    <>
      <div className="nav-container" id="navContainer">
        <div className="header">
          <div className="left-section">
            <Link to='/' className="main-logo">
              Kitsukeep.
            </Link>
            <Link to="/Watchlist" className="menu-button">Watchlist</Link>
            <a href="#" className="menu-button">Playlists</a>
          </div>
          <div className="right-section">
            <a href="#">Some Stuff</a>
            <div className="search-container">
              <button className="search">
                <span className="icon">🔍</span>
              </button>
            </div>
            <button className="user-menu">
              <span className="icon">👤</span>
              USER
              <span className="icon">▼</span>
            </button>

            <button className="language-button">
              EN
              <span className="icon">▼</span>
            </button>

            <button className="user-menu">
              <Link to="/Login" className="icon">Log in</Link>
              <span className="icon">▼</span>
            </button>
            <button className="user-menu">
              <Link to="/Logout" className="icon">Log Out</Link>
              <span className="icon">▼</span>
            </button>
             <button className="user-menu">
              <Link to="/Signup" className="icon">Sign</Link>
              <span className="icon">▼</span>
            </button>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="carousel-section">
          <h1 className="carousel-title"> Carousel Here</h1>
          <p className="carousel-subtitle">Some Animes images here</p>
        </div>
        <button className="carousel-button">#</button>
        <p>Your site content goes here.</p>
      </div>

      <div className="anime-cards">
        <div className="card">
          <h3 className="card-title">Anime 1</h3>
          <p className="card-description">
            Anime name and a few info
          </p>
        </div>
        <div className="card">
          <h3 className="card-title">Anime 2</h3>
          <p className="card-description">
            Anime name and a few info
          </p>
        </div>
        <div className="card">
          <h3 className="card-title">Anime 3</h3>
          <p className="card-description">
            Anime name and a few info
          </p>
        </div>
        <div className="card">
          <h3 className="card-title">Anime 4</h3>
          <p className="card-description">
            Anime name and a few info
          </p>
        </div>
        <div className="card">
          <h3 className="card-title">Anime 5</h3>
          <p className="card-description">
            Anime name and a few info
          </p>
        </div>
        <div className="card">
          <h3 className="card-title">Anime 6</h3>
          <p className="card-description">
            Anime name and a few info
          </p>
        </div>
        <div className="card">
          <h3 className="card-title">Anime 7</h3>
          <p className="card-description">
            Anime name and a few info
          </p>
        </div>
        <div className="card">
          <h3 className="card-title">Anime 8</h3>
          <p className="card-description">
            Anime name and a few info
          </p>
        </div>
        <div className="card">
          <h3 className="card-title">Anime 9</h3>
          <p className="card-description">
            Anime name and a few info
          </p>
        </div>
        <div className="card">
          <h3 className="card-title">Anime 10</h3>
          <p className="card-description">
            Anime name and a few info
          </p>
        </div>
        <div className="card">
          <h3 className="card-title">Anime 11</h3>
          <p className="card-description">
            Anime name and a few info
          </p>
        </div>
        <div className="card">
          <h3 className="card-title">Anime 12</h3>
          <p className="card-description">
            Anime name and a few info
          </p>
        </div>
        <div className="card">
          <h3 className="card-title">Anime 13</h3>
          <p className="card-description">
            Anime name and a few info
          </p>
        </div>
        <div className="card">
          <h3 className="card-title">Anime 14</h3>
          <p className="card-description">
            Anime name and a few info
          </p>
        </div>
        <div className="card">
          <h3 className="card-title">Anime 1</h3>
          <p className="card-description">
            Anime name and a few info
          </p>
        </div>
      </div>
    </>
  );
}

export default HomePage;
