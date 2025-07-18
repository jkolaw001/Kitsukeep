import { useState } from "react";
import { useUser } from "./UserProvider.jsx";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const API_BASE = "http://localhost:8000";

/**
 * Signup page component. Handles signup form submission and updates user context.
 * @returns {import('react').ReactElement}
 */
export default function Signup() {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { refreshUser } = useUser();
    const navigate = useNavigate();

    /**
     * Handles signup form submission using React 19's form action pattern.
     * @param {FormData} formData
     * @returns {Promise<void>}
     */
    async function handleSignup(formData) {
        setError("");
        setIsLoading(true);

        try {
            const data = {
                username: formData.get("username"),
                password: formData.get("password"),
            };

            const response = await fetch(`${API_BASE}/api/signup`, {
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
                setError(errorData.detail || "Signup failed");
            }
        } catch (err) {
            setError("Network error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="login-container">
            <title>Kitsukeep | Signup</title>
            <div className="sign-up-logo">
                <h1 className="logo-title">Kitsukeep.</h1>
            </div>
            <div className="login-card">
                <h1 className="login-title">Sign Up</h1>

                <form action={handleSignup} className="login-form">
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

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            Confirm Password
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

                    <button
                        type="submit"
                        className="login-button"
                        disabled={isLoading}
                    >
                        {isLoading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>

                {error && (
                    <div className="error-message" role="alert">
                        {error}
                    </div>
                )}

                <div className="login-footer">
                    <p>
                        Already have an account?{" "}
                        <Link to="/Login" className="signup-link">
                            Log in here
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
