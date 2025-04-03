import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "~/components/AuthForm";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.status >= 400) {
        setError(data.message || "Registration failed.");
        return;
      }

      alert("Registration successful!");
      navigate("/app/login");
    } catch (err) {
      setError("An error occurred during registration.");
    }
  };

  return (
    <AuthForm
      title="Register"
      email={email}
      password={password}
      error={error}
      onEmailChange={(e) => setEmail(e.target.value)}
      onPasswordChange={(e) => setPassword(e.target.value)}
      onSubmit={handleRegister}
      buttonText="Register"
    />
  );
}
