function Songs() {
  const songs = [
    {
      id: 1,
      title: "Baglo Tomar Alor",
      category: "Agomoni",
      audio: "/audio/baglo_tomer_alor.mp3",
    },
    {
      id: 2,
      title: "Jago Tumi Jago",
      category: "Agomoni",
      audio: "/audio/jago tumi jago.mp3",
    },
    {
      id: 3,
      title: "Chinmoyee Rup Dhore",
      category: "Agomoni",
      audio: "/audio/Chinmoyee Rup Dhore ...mp3",
    },
    {
      id: 4,
      title: "Esho Maa Durga",
      category: "Agomoni",
      audio: "/audio/Esho Maa Durga.mp3",
    },
    {
      id: 5,
      title: "Mahalaya",
      category: "Mahalaya",
      audio: "/audio/mahalaya.mp3",
    },

    // Add your remaining songs here
  ];

  return (
    <main className="songs-page">

      <section className="songs-page-header">

        <span>
          🎵 আগমনী ও ঢাক
        </span>

        <h1>
          Agomoni Songs
        </h1>

        <p>
          মায়ের আগমনের সুর, ঢাকের বাদ্য আর শরতের আবেশ।
        </p>

      </section>


      <section className="songs-grid">

        {songs.map((song) => (
          <article
            className="song-card"
            key={song.id}
          >

            <span className="song-category">
              {song.category}
            </span>

            <h2>
              {song.title}
            </h2>

            <audio
              controls
              src={song.audio}
            />

          </article>
        ))}

      </section>

    </main>
  );
}

export default Songs;