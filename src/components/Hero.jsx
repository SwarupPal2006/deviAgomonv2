import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/hero.css";

function getTimeMode() {
  const hour = new Date().getHours();

  // Day: 4 AM → 6 PM
  // Night: 6 PM → 4 AM

  if (hour >= 4 && hour < 18) {
    return "day";
  }

  return "night";
}

function Hero() {
  const [timeMode, setTimeMode] = useState(getTimeMode);

  useEffect(() => {
    const checkTime = () => {
      setTimeMode(getTimeMode());
    };

    // Check every 30 seconds
    const timer = setInterval(checkTime, 30000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className={`hero hero-${timeMode}`}>

      {/* Background image */}
      <div className="hero-background"></div>

      {/* Dark / soft overlay */}
      <div className="hero-overlay"></div>

      {/* Decorative glow */}
      <div className="hero-glow"></div>


      <div className="hero-container">

        {/* =========================
            LEFT CONTENT
        ========================= */}

        <div className="hero-content">

          <span className="devipaksha-badge">
            ✨ আগমনীর শুভ বার্তা ✨
          </span>


          <h1 className="hero-main-title">
            শুভ দেবীপক্ষ
          </h1>


          <p className="hero-tagline">
            মা আসছেন — শুভ মহালয়া ও দুর্গাপূজার শুভেচ্ছা
          </p>


          <p className="hero-english-sub">
            Welcome to Devipaksha — The Spirit of Durga Puja
          </p>


          <div className="hero-poetry-quote">
            <span className="quote-mark">“</span>

            কাশফুলের দোলা, ঢাকের বাদ্য আর শিউলির গন্ধে
            আবারও আসছে মায়ের আগমনী। আলোকময় শরৎকালে
            ধরণী সেজে উঠছে দেবীবরণের উল্লাসে।

            <span className="quote-mark">”</span>
          </div>


          {/* Buttons */}
          <div className="hero-buttons">

            <button
                  onClick={() => {
              document.getElementById("countdown")?.scrollIntoView({
              behavior: "smooth",
                    });
                   }}
              >
             কাউন্টডাউন দেখুন
            </button>


            <Link
              to="/puja-guide"
              className="hero-btn hero-btn-secondary"
            >
              পুজো গাইড
            </Link>

          </div>

        </div>




      </div>


      {/* Bottom indicator */}
      <div className="hero-bottom">

        <span>
          {timeMode === "day" ? "☀️ শুভ সকাল" : "🌙 শুভ রাত্রি"}
        </span>

        <span className="bottom-line"></span>

        <span>
          {timeMode === "day"
            ? "মা আসার অপেক্ষায়"
            : "আগমনী রাতের আবেশে"}
        </span>

      </div>

    </section>
  );
}

export default Hero;