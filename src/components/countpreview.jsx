import { useEffect, useState } from "react";
import "../style/countdown.css"

function Countdown() {
  // Mahalaya 2026
  const targetDate = new Date("2026-10-16T00:00:00+05:30").getTime();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        completed: true,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      ),
      minutes: Math.floor(
        (difference / (1000 * 60)) % 60
      ),
      seconds: Math.floor(
        (difference / 1000) % 60
      ),
      completed: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="countdown-section" id="countdown">

      <div className="countdown-container">

        {/* MAIN COUNTDOWN BOX */}
        <div className="countdown-wrapper">

          {/* LEFT — DURGA ART */}
          <div className="countdown-art">

            <img
              src="https://i.pinimg.com/736x/d6/3d/38/d63d388c72ef72b8731d27071b35f0e2.jpg"
              alt="Durga"
            />

          </div>


          {/* CENTER — COUNTDOWN */}
          <div className="countdown-main">

            <h2>
              মহাষষ্ঠী ২০২৬
            </h2>

            {/* DECORATIVE LINE */}
            <div className="ornament">

              <span></span>

              <b>❖</b>

              <span></span>

            </div>


            {/* COMPLETED MESSAGE */}
            {timeLeft.completed ? (
              <div className="countdown-completed">

                <h3>
                  শুভ মহালয়া 🌺
                </h3>

                <p>
                  মহালয়ার শুভ আগমনী ইতিমধ্যেই শুরু হয়েছে।
                </p>

              </div>
            ) : (

              /* TIMER */
              <div className="countdown-grid">

                {/* DAYS */}
                <div className="timer-card">

                  <span className="timer-digits">
                    {String(timeLeft.days).padStart(2, "0")}
                  </span>

                  <span className="timer-label">
                    দিন (Days)
                  </span>

                </div>


                {/* HOURS */}
                <div className="timer-card">

                  <span className="timer-digits">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>

                  <span className="timer-label">
                    ঘণ্টা (Hours)
                  </span>

                </div>


                {/* MINUTES */}
                <div className="timer-card">

                  <span className="timer-digits">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>

                  <span className="timer-label">
                    মিনিট (Minutes)
                  </span>

                </div>


                {/* SECONDS */}
                <div className="timer-card">

                  <span className="timer-digits">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>

                  <span className="timer-label">
                    সেকেন্ড (Seconds)
                  </span>

                </div>

              </div>
            )}

          </div>


          {/* RIGHT — QUOTE */}
          <div className="countdown-quote">

            <div className="quote-flower">
              ❧
            </div>

            <p>
              “শরৎ এসেছে,
              <br />
              মায়ের আগমনী বার্তা
              <br />
              নিয়ে...”
            </p>

            <div className="quote-flower">
              ❖
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Countdown;