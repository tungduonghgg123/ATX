import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { JWT_TOKEN_KEY } from "~/routes/app.login";

export const LOCAL_STORAGE_UPDATED_EVENT = "localStorageUpdated";

export default function Navbar() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const updateUserEmail = () => {
    const token = localStorage.getItem(JWT_TOKEN_KEY);
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
        if (payload.exp * 1000 > Date.now()) {
          setUserEmail(payload.email);
        } else {
          localStorage.removeItem(JWT_TOKEN_KEY); // Remove expired token
          setUserEmail(null);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem(JWT_TOKEN_KEY);
        setUserEmail(null);
      }
    } else {
      setUserEmail(null);
    }
  };

  useEffect(() => {
    updateUserEmail();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === JWT_TOKEN_KEY) {
        updateUserEmail();
      }
    };

    const handleCustomEvent = () => {
      updateUserEmail();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener(LOCAL_STORAGE_UPDATED_EVENT, handleCustomEvent);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        LOCAL_STORAGE_UPDATED_EVENT,
        handleCustomEvent
      );
    };
  }, []);

  return (
    <nav
      style={{
        backgroundColor: "#333",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <ul style={{ listStyleType: "none", display: "flex", gap: "20px" }}>
        <li>
          <Link to="/app" style={{ color: "#fff", textDecoration: "none" }}>
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/app/auction"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Auction
          </Link>
        </li>
      </ul>
      <div>
        {userEmail ? (
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <span style={{ color: "#fff" }}>{userEmail}</span>
            <button
              onClick={() => {
                localStorage.removeItem(JWT_TOKEN_KEY);
                setUserEmail(null);
                window.dispatchEvent(new Event(LOCAL_STORAGE_UPDATED_EVENT));
              }}
              style={{
                backgroundColor: "#f00",
                color: "#fff",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "10px" }}>
            <Link
              to="/app/login"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Login
            </Link>
            <Link
              to="/app/register"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
