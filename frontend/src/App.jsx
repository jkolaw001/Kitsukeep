import "./App.css";
import HomePage from "./pages/Home.jsx";
import { Routes, Route } from "react-router-dom";
import WatchlistPage from "./pages/Watchlist.jsx";
import Login from "./loginpages/Login.jsx";
import Logout from "./loginpages/Logout.jsx";
import Signup from "./loginpages/Signup.jsx";
import ProtectedRoute from "../src/loginpages/ProtectedRoute.jsx";
import AnimeDetailFromHomePage from "./pages/details-from-homepage.jsx";
import AnimeDetailFromWatchlist from "./pages/details-from-watchlist.jsx";

function App() {

  return (
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
      <Route path="/anime/Home/:id" element={<AnimeDetailFromHomePage />} />
      <Route path="/anime/Watchlist/:id" element={<AnimeDetailFromWatchlist />} />
    </Routes>
  );
}

export default App;
