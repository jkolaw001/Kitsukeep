import "./App.css";
import HomePage from "./pages/Home.jsx";
import { Routes, Route } from "react-router-dom";
import WatchlistPage from "./pages/Watchlist.jsx";
import Login from "./loginpages/Login.jsx";
import Logout from "./loginpages/Logout.jsx";
import Signup from "./loginpages/Signup.jsx";
import ProtectedRoute from "../src/loginpages/ProtectedRoute.jsx";
import AnimeDetailFromHomePage from "./pages/details-from-homepage.jsx";
import Header from "./pages/Header.jsx";
import AnimeDetailFromWatchlist from "./pages/details-from-watchlist.jsx";
import SearchResultsPage from "./pages/SearchResults.jsx";
import AnimeDetailFromSearch from "./pages/details-from-search.jsx"


function App() {

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/Watchlist"
            element={<WatchlistPage />}
          />
          <Route path="/Login" element={<Login />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/anime/:id" element={<AnimeDetailFromHomePage />} />
          <Route path="/anime/Watchlist/:id" element={<AnimeDetailFromWatchlist />} />
          <Route path="/search/:query" element={<SearchResultsPage />}></Route>
          <Route path="/anime/search/:mal_id" element={<AnimeDetailFromSearch />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
