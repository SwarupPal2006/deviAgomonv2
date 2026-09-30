
import { useEffect, useState } from "react";
import "./../LandingPage.css";
import durgaImage from "../assets/loader.png";

function LandingPage() {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("মা আসছেন...");
  const [isHidden, setIsHidden] = useState(false);

  const messages = [
    "মা আসছেন...",
    "শিউলির গন্ধে শরৎ জাগছে...",
    "ঢাকের বাদ্য বেজে উঠছে...",
    "মায়ের আগমনী...",
    "শুভ দেবীপক্ষ!",
  ];

  useEffect(() => {
    let currentProgress = 0;

    const progressInterval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 6) + 2;

      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(progressInterval);
      }

      setProgress(currentProgress);

      const messageIndex = Math.min(
        Math.floor(currentProgress / 20),
        messages.length - 1
      );

      setMessage(messages[messageIndex]);
    }, 100);

    const loaderTimer = setTimeout(() => {
      clearInterval(progressInterval);

      setProgress(100);
      setMessage("শুভ দেবীপক্ষ!");

      // Small pause after reaching 100%
      setTimeout(() => {
        setIsHidden(true);
      }, 700);
    }, 3500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(loaderTimer);
    };
  }, []);

  return (
    <>
      {/* =========================
          DURGA LOADING SCREEN
      ========================== */}
      <div
        id="durga-loader"
        className={isHidden ? "loader-hidden" : ""}
        style={{
          backgroundImage: `url(${durgaImage})`,
        }}
      >
        <div className="loader-overlay">

          <div className="loader-content">

            <h1>শুভ দেবীপক্ষ</h1>

            <p id="loader-message">
              {message}
            </p>

            <div className="loader-progress">
              <div
                id="loader-progress-bar"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <div id="loader-percent">
              {progress}%
            </div>

          </div>

        </div>
      </div>

    </>
  );
}

export default LandingPage;

