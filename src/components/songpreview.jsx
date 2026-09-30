import { Link } from "react-router-dom";

function SongsPreview() {
  const featuredSongs = [
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
  ];

  return (
    <section className="songs-preview">

      <div className="songs-preview-header">

        <div>
          <span className="section-label">
            🎵 আগমনী সুর
          </span>

          <h2>
            Agomoni Songs
          </h2>

          <p>
            মায়ের আগমনের সুরে শরৎ হোক আরও আনন্দময়।
          </p>
        </div>

        {/* VIEW ALL */}
       <a href="https://music.youtube.com/playlist?list=PLJAiFJ6bGyew" target="_blank" rel="noopener noreferrer" className="view-all-btn">
  View All Songs →
</a>

      </div>


      {/* FEATURED SONGS */}
      <div className="songs-preview-grid">

        {featuredSongs.map((song) => (
          <article
            className="song-card"
            key={song.id}
          >

            <div className="song-card-content">

              <span className="song-category">
                {song.category}
              </span>

              <h3>
                {song.title}
              </h3>

              <audio
                controls
                src={song.audio}
              />

            </div>

          </article>
        ))}

      </div>

    </section>
  );
}

export default SongsPreview;