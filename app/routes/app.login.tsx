import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_UPDATED_EVENT } from "~/components/Navbar";
import AuthForm from "~/components/AuthForm";

export const JWT_TOKEN_KEY = "jwtToken";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

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

      localStorage.setItem(JWT_TOKEN_KEY, data.token);
      window.dispatchEvent(new Event(LOCAL_STORAGE_UPDATED_EVENT));
      alert("Login successful!");
      navigate("/app");
    } catch (err) {
      setError("An error occurred during login.");
    }
  };

  return (
    <AuthForm
      title="Login"
      email={email}
      password={password}
      error={error}
      onEmailChange={(e) => setEmail(e.target.value)}
      onPasswordChange={(e) => setPassword(e.target.value)}
      onSubmit={handleLogin}
      buttonText="Login"
    />
  );
}
