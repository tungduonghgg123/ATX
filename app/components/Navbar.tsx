import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ backgroundColor: "#333", padding: "1rem" }}>
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
    </nav>
  );
}
