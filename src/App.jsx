import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingpage";
import Navbar from "./components/navber";

import Home from "./pages/Home";
import Guide from "./pages/pujaGuide";
// import Dhak from "./pages/Dhak";
// import Schedule from "./pages/Schedule";
// import Countdown from "./pages/Countdown";
// import About from "./pages/About";

function App() {
  return (
    
    <>
      <LandingPage />;
      {/* Navbar stays visible on every page */}
      <Navbar />

      {/* Page content */}
      <main>
        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/puja-guide" element={<Guide />} />

          {/* <Route path="/dhak" element={<Dhak />} />

          <Route path="/schedule" element={<Schedule />} />

          <Route path="/countdown" element={<Countdown />} /> */}

          {/* <Route path="/about" element={<About />} /> */}

        </Routes>
      </main>
    </>
  );
}

export default App;