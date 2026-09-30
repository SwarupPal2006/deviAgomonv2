import { Link } from "react-router-dom";
import "./../App.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-container">

        {/* LEFT — Logo & Brand */}
        <Link to="/" className="brand">
          <div className="brand-logo">
            <img
              src="https://media.istockphoto.com/id/2232239058/vector/happy-durga-puja-poster-template-design-with-goddess-durga-eyes-and-trishul.jpg?s=612x612&w=0&k=20&c=Up995Lz_znDLWBIaW9N1m2b72-Uigzua2IbM0Rh082w="
              alt="Devi Agomon"
            />
          </div>

          <div className="brand-text">
            <span className="brand-title">দেবী আগমন</span>
            <span className="brand-subtitle">Durga Puja 2026</span>
          </div>
        </Link>

        {/* MIDDLE — Navigation */}
        <nav className="nav-links">

          <Link to="/" className="nav-link">
            Home
          </Link>

          {/* <Link to="/Songs" className="nav-link">
            Agomoni Songs
          </Link> */}

          <Link to="/puja-panjika" className="nav-link">
            Puja Panjika
          </Link>

          <Link to="/puja-guide" className="nav-link">
            Puja Guide
          </Link>

          <Link to="/about" className="nav-link">
            About
          </Link>

        </nav>

        {/* RIGHT — Actions */}
        <div className="nav-actions">

          <button className="music-btn" title="Music">
            🎵
          </button>

          <button className="menu-btn" title="Menu">
            ☰
          </button>

        </div>

      </div>
    </header>
  );
}

export default Navbar;