import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this import

export const JWT_TOKEN_KEY = "jwtToken"; // Export the jwtToken key constant

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.message) {
        setError(data.message);
        return;
      }

      localStorage.setItem(JWT_TOKEN_KEY, data.token); // Use the exported constant
      alert("Login successful!"); // Show toast notification
      navigate("/app"); // Navigate to /app
      console.log("Login successful:", data);
    } catch (err) {
      setError("An error occurred during login.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
