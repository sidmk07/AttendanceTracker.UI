import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

/**
 * Handles user login
 *
 * @returns {React.ReactElement} A JSX element representing the login form
 */
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    /**
     * Asynchronously handles the user login process by preventing default form submission,
     * clearing existing errors, and sending a POST request to the authentication API
     * with the provided email and password. If the login is successful, navigates to the dashboard.
     * If an error occurs, sets an appropriate error message.
     *
     * @param {Event} e - The event object from the form submission.
     */
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await api.post("/auth/login", { email, password });
            if (response.status === 200) {
                // Redirect to Dashboard
                navigate("/dashboard");
            }
        } catch (err) {
            setError("Invalid email or password. Please try again.");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default Login;
