import Hero from "../components/Hero";
import Countdown from "../components/countpreview";
import SongsPreview from "../components/songpreview";
// import PujaPanjika from "../components/PujaPanjika";

function Home() {
  return (
    <main>

      {/* HERO */}
      <Hero />

      {/* COUNTDOWN */}
      <Countdown />
      <SongsPreview/>

     

    </main>
  );
}

export default Home;