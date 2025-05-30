import { useState } from "react";
import { useUser } from "./UserProvider.jsx";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import Signup from "./Signup.jsx";
import { Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

const API_BASE = "http://localhost:8000";

/**
 * Login page component. Handles login form submission and updates user context.
 * @returns {import('react').ReactElement}
 */
export default function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { refreshUser } = useUser();
  const navigate = useNavigate();

  /**
   * Handles login form submission using React 19's form action pattern.
   * @param {FormData} formData
   * @returns {Promise<void>}
   */
  async function handleLogin(formData) {
    setError("");
    setIsLoading(true);

    try {
      const data = {
        username: formData.get("username"),
        password: formData.get("password"),
      };

      const response = await fetch(`${API_BASE}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await refreshUser();
        navigate("/");
      } else {
        const errorData = await response.json();
        setError(errorData.detail || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    handleLogin(formData);
  }

  return (
    <main className="login-container">
      <title>Kitsukeep | Login</title>
      <div className="sign-up-logo">
        <h1 className="logo-title">Kitsukeep.</h1>
      </div>
      <div className="login-card">
        <h1 className="login-title">Welcome Back</h1>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="form-input"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-input"
              required
              disabled={isLoading}
            />
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}

        <div className="login-footer">
          <p>
            Don't have an account?{" "}
            <Link to="/Signup" className="signup-link">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
