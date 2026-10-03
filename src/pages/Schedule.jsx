import "../style/panjika.css"

function PujaPanjika() {
  const pujaDays = [
    {
      day: "Mahalaya",
      date: "10 October 2026",
      bengaliDate: "মহালয়া",
      description: "মায়ের আগমনের শুভ সূচনা।",
    },
    {
      day: "Shashthi",
      date: "16 October 2026",
      bengaliDate: "ষষ্ঠী",
      description: "দেবীর বোধন ও আমন্ত্রণ।",
    },
    {
      day: "Saptami",
      date: "17 October 2026",
      bengaliDate: "সপ্তমী",
      description: "নবপত্রিকা স্নান ও সপ্তমীর পূজা।",
    },
    {
      day: "Ashtami",
      date: "18 October 2026",
      bengaliDate: "অষ্টমী",
      description: "মহাষ্টমীর পূজা ও সন্ধিপূজা।",
    },
    {
      day: "Navami",
      date: "19 October 2026",
      bengaliDate: "নবমী",
      description: "মহানবমীর পূজা ও আরতি।",
    },
    {
      day: "Dashami",
      date: "20 October 2026",
      bengaliDate: "দশমী",
      description: "বিজয়া দশমী ও দেবীর বিসর্জন।",
    },
  ];

  return (
    <main className="puja-panjika-page">

      {/* Page Header */}
      <section className="panjika-header">
        <span className="section-label">
          🌺 দেবী আগমন
        </span>

        <h1>পূজা পঞ্জিকা</h1>

        <p>
          দুর্গাপূজা ২০২৬-এর গুরুত্বপূর্ণ দিন ও পূজা সূচি
        </p>
      </section>

      {/* Puja Schedule */}
      <section className="panjika-section">

        <div className="panjika-title">
          <p>
            মা দুর্গার আগমন থেকে বিজয়া দশমী পর্যন্ত
            পূজার গুরুত্বপূর্ণ দিনগুলি।
          </p>
        </div>

        <div className="panjika-grid">

          {pujaDays.map((puja) => (
            <article
              className="panjika-card"
              key={puja.day}
            >

              <div className="panjika-card-top">
                <span className="panjika-bengali-date">
                  {puja.bengaliDate}
                </span>

                <span className="panjika-day">
                  {puja.day}
                </span>
              </div>

              <div className="panjika-card-body">

                <h3>{puja.date}</h3>

                <p>
                  {puja.description}
                </p>

              </div>

            </article>
          ))}

        </div>
      </section>

      {/* Additional Information */}
      <section className="panjika-info">

        <div className="info-card">
          <span>🌾</span>

          <div>
            <h3>শরতের আগমনী</h3>

            <p>
              কাশফুল, শিউলি আর ঢাকের বাদ্যে
              শুরু হোক দেবী আগমনের আনন্দ।
            </p>
          </div>
        </div>

        <div className="info-card">
          <span>🪔</span>

          <div>
            <h3>পূজার প্রস্তুতি</h3>

            <p>
              পূজার প্রতিটি গুরুত্বপূর্ণ দিনের
              সূচি এক জায়গায় দেখে নিন।
            </p>
          </div>
        </div>

      </section>

    </main>
  );
}

export default PujaPanjika;