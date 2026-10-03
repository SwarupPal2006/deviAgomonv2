import { useRef, useState } from "react";

import song2 from "../audio/Om Jayatang Devi Chamunde.mp3";
import song1 from "../audio/Dugga Elo.mp3";
import song3 from "../audio/mahalaya.mp3";

function MusicCard({ song }) {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleProgress = (e) => {
    const value = Number(e.target.value);

    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <article className="music-card">

      {/* AUDIO */}
      <audio
        ref={audioRef}
        src={song.audio}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

      {/* TOP */}
      <div className="music-card-top">

        <img
          src={song.image}
          alt={song.title}
          className="music-cover"
        />

        <div className="music-info">

          <h3>{song.title}</h3>

          <p>{song.artist}</p>

        </div>

      </div>


      {/* TIME */}
      <div className="music-time">

        <span>
          {formatTime(currentTime)}
        </span>

        <span>
          -{formatTime(Math.max(duration - currentTime, 0))}
        </span>

      </div>


      {/* PROGRESS */}
      <div className="music-progress">

        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleProgress}
        />

      </div>


      {/* CONTROLS */}
      <div className="music-controls">

        <button
          className="music-control secondary"
          title="Shuffle"
        >
          ⇄
        </button>


        <button
          className="music-control"
          title="Previous"
        >
          ⏮
        </button>


        <button
          className="music-play"
          onClick={togglePlay}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "Ⅱ" : "▶"}
        </button>


        <button
          className="music-control"
          title="Next"
        >
          ⏭
        </button>


        <button
          className="music-control secondary"
          title="Repeat"
        >
          ↻
        </button>

      </div>

    </article>
  );
}


function SongsPreview() {

  const featuredSongs = [
    {
      id: 1,
      title: "দুগ্গা এলো",
      artist: "Agomoni Song",
      category: "আগমনী গান",
      audio: song1,
      image:
        "https://c.saavncdn.com/534/Dugga-Elo-Bengali-2019-20190920175918-500x500.jpg",
    },

    {
      id: 2,
      title: "ওঁ জয়তাং দেবী চামুণ্ডে",
      artist: "Devi Vandana",
      category: "দেবী বন্দনা",
      audio: song2,
      image:
        "https://m.media-amazon.com/images/I/61QeNyxwR4L._UXNaN_FMjpg_QL85_.jpg",
    },

    {
      id: 3,
      title: "মহালয়া",
      artist: "Mahalaya Special",
      category: "মহালয়া",
      audio: song3,
      image:
        "https://images.indianexpress.com/2019/09/subho-mahalaya_3.jpg",
    },
  ];

  return (
    <section className="songs-preview">

      <div className="songs-preview-header">

        <div>
          <span className="section-label">
            🎵 আগমনী সুর
          </span>

          <h2>Agomoni Songs</h2>

          <p>
            মায়ের আগমনের সুরে শরৎ হোক আরও আনন্দময়।
          </p>
        </div>

        <a
          href="https://music.youtube.com/playlist?list=PLJAiFJ6bGyew"
          target="_blank"
          rel="noopener noreferrer"
          className="view-all-btn"
        >
          View All Songs →
        </a>

      </div>


      <div className="songs-preview-grid">

        {featuredSongs.map((song) => (
          <MusicCard
            key={song.id}
            song={song}
          />
        ))}

      </div>

    </section>
  );
}

export default SongsPreview;