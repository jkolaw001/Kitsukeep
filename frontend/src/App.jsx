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
import AnimeResults from "./pages/search-list.jsx";

function App() {

  return (
    <>
      <header>
          <Header />
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={
                <HomePage />
            }
          />
          <Route
            path="/Watchlist"
            element={
              <ProtectedRoute>
                <WatchlistPage />
              </ProtectedRoute>
            }
          />
          <Route path="/Login" element={<Login />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/anime/:id" element={<AnimeDetailFromHomePage />} />
          <Route path="/anime/Watchlist/:id" element={<AnimeDetailFromWatchlist />} />
          <Route path="/search-results" element={<AnimeResults />}></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
