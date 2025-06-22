import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import MelanjutkanFilm from '../components/MelanjutkanFilm'
import TopRatingToday from '../components/TopRating'
import FilmTrending from '../components/FilmTrending'
import RilisBaru from '../components/RilisBaru'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <div className="mt-8 w-[94.5%] mx-auto rounded-4xl bg-white/15 backdrop-blur-md py-4 shadow-2xl border border-white/20">
        <h2 className="pl-10 text-white text-2xl md:text-3xl font-bold mb-5">
          Melanjutkan Film
        </h2>
        <MelanjutkanFilm />
        <h2 className="pl-10 text-white text-2xl md:text-3xl font-bold mb-5">
          Top Rating Film dan Series Hari Ini
        </h2>
        <TopRatingToday />
        <h2 className="pl-10 text-white text-2xl md:text-3xl font-bold mb-5">
          Film Trending
        </h2>
        <FilmTrending />
        <h2 className="pl-10 text-white text-2xl md:text-3xl font-bold mb-5">
          Rilis Baru
        </h2>
        <RilisBaru />
      </div>
      <Footer />
    </div>
  );
}

export default Home