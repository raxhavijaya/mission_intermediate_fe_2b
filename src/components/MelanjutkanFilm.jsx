import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import moviesData from "../data/movies.json";

const MelanjutkanFilm = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperReady, setSwiperReady] = useState(false);

  useEffect(() => {
    setSwiperReady(true);
  }, []);

  return (
    <section className="px-4 md:px-10 mt-2 mb-10 relative">

      <div className="relative">
        {swiperReady && (
          <>
            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className="w-full"
            >
              {moviesData.map((movie) => (
                <SwiperSlide key={movie.id}>
                  <div className="relative group rounded-2xl overflow-hidden border border-white/20 shadow-lg bg-white/5 backdrop-blur-md transition-transform duration-300 hover:scale-105">
                    {/* Poster */}
                    <img
                      src={movie.banner}
                      alt={movie.title}
                      className="w-full h-[180px] object-cover"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      {/* Top row: tombol & rating */}
                      <div className="flex items-center justify-between mb-2">
                        <button className="bg-white text-black text-sm font-bold py-1 px-3 rounded-lg hover:bg-gray-300 transition">
                          ▶ Tonton
                        </button>
                        <span className="text-white text-xs bg-white/10 border border-white/30 px-2 py-1 rounded-lg backdrop-blur-md">
                          ⭐ {movie.rating}
                        </span>
                      </div>

                      {/* Judul */}
                      <h3 className="text-white text-lg font-bold line-clamp-1">
                        {movie.title}
                      </h3>

                      {/* Genre */}
                      <div className="text-white text-xs mt-1 flex gap-2 flex-wrap">
                        {movie.genres?.map((genre, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-white/10 border border-white/20 rounded-md backdrop-blur-md"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Tombol Navigasi */}
            <button
              ref={prevRef}
              className="absolute top-1/2 -translate-y-1/2 -left-4 z-10 p-2 bg-white/10 border border-white/30 text-white rounded-full hover:bg-white/20 transition"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              ref={nextRef}
              className="absolute top-1/2 -translate-y-1/2 -right-4 z-10 p-2 bg-white/10 border border-white/30 text-white rounded-full hover:bg-white/20 transition"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default MelanjutkanFilm;
