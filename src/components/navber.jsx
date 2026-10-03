
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../style/navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close the mobile menu when changing pages
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close menu with Escape key
  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Puja Panjika", path: "/schedule" },
    { name: "Puja Guide", path: "/puja-guide" },
    { name: "About", path: "/about" },
  ];

  return (
    <header className="navbar">
      <div className="nav-container">

        {/* LOGO & BRAND */}
        <Link to="/" className="brand">
          <div className="brand-logo">
            <img
              src="https://i.pinimg.com/736x/ec/1a/7a/ec1a7a90372855c00dd537ab07b62652.jpg"
              alt="Devi Agomon"
            />
          </div>

          <div className="brand-text">
            <span className="brand-title">দেবী আগমন</span>
            <span className="brand-subtitle">
              Durga Puja 2026
            </span>
          </div>
        </Link>

        {/* NAVIGATION */}
        <nav
          id="primary-navigation"
          className={`nav-links ${menuOpen ? "active" : ""}`}
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${
                location.pathname === item.path ? "current" : ""
              }`}
              aria-current={
                location.pathname === item.path ? "page" : undefined
              }
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="nav-actions">
          <button
            className="music-btn"
            type="button"
            title="Music"
            aria-label="Music"
          >
            🎵
          </button>

          <button
            className="menu-btn"
            type="button"
            title={menuOpen ? "Close menu" : "Open menu"}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span>{menuOpen ? "✕" : "☰"}</span>
          </button>
        </div>

      </div>

      {/* MOBILE BACKDROP */}
      {menuOpen && (
        <button
          className="nav-backdrop"
          aria-label="Close navigation menu"
          tabIndex={-1}
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
}

export default Navbar;