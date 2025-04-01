import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div>
      <Navbar /> {/* Display navbar */}
      <main style={{ padding: "2rem" }}>
        <Outlet /> {/* Render the child pages like home or auction */}
      </main>
    </div>
  );
}
