import { Info, Play, RotateCw } from "lucide-react";
import { useEffect, useState } from "react";
import { Slider } from "@/components/general/slider";
import { useNavigate } from "react-router-dom";

export interface ShowResponse {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  media_type?: "tv" | "movie";
  name: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export default function Dashboard() {
  const [selected, setSelected] = useState("movie");
  const [shows, setShows] = useState<ShowResponse[]>([]);
  const [popular, setPopular] = useState<ShowResponse[]>([]);
  const [topRated, setTopRated] = useState<ShowResponse[]>([]);
  const [trending, setTrending] = useState<ShowResponse[]>([]);
  const [onTheAir, setOnTheAir] = useState<ShowResponse[]>([]);
  const [popularShows, setPopularShows] = useState<ShowResponse[]>([]);

  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [trailerLoading, setTrailerLoading] = useState(false);
  const [trailerError, setTrailerError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Instead of recalculating randomMovie on every render, store its index in state and only update when 'shows' or 'selected' changes
  const [randomIndex, setRandomIndex] = useState<number | null>(null);
  useEffect(() => {
    if (shows.length > 0) {
      setRandomIndex(Math.floor(Math.random() * shows.length));
    } else {
      setRandomIndex(null);
    }
  }, [shows]);
  const randomMovie = randomIndex !== null ? shows[randomIndex] : undefined;

  useEffect(() => {
    const fetchMovies = async () => {
      const url = `https://api.themoviedb.org/3/trending/${selected}/day?language=en-US`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTE5OTc1ODQ2MjNhMzA5ZTAxNDZhOTFkNjdhMDMzZiIsIm5iZiI6MTc1MTM1NzA3Ny4zNzUsInN1YiI6IjY4NjM5Njk1MDNhZTliZGFmOWY4M2RmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cvL75faEssjtOWnf3fFKH87bnTW5zI8zfZX4I4sdSG0`,
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        setShows(data.results);
      }
    };
    fetchMovies();
  }, [selected]);

  useEffect(() => {
    const fetchMovies = async () => {
      const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTE5OTc1ODQ2MjNhMzA5ZTAxNDZhOTFkNjdhMDMzZiIsIm5iZiI6MTc1MTM1NzA3Ny4zNzUsInN1YiI6IjY4NjM5Njk1MDNhZTliZGFmOWY4M2RmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cvL75faEssjtOWnf3fFKH87bnTW5zI8zfZX4I4sdSG0`,
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        setPopular(data.results);
      }
    };
    fetchMovies();
  }, []);
  useEffect(() => {
    const fetchMovies = async () => {
      const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTE5OTc1ODQ2MjNhMzA5ZTAxNDZhOTFkNjdhMDMzZiIsIm5iZiI6MTc1MTM1NzA3Ny4zNzUsInN1YiI6IjY4NjM5Njk1MDNhZTliZGFmOWY4M2RmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cvL75faEssjtOWnf3fFKH87bnTW5zI8zfZX4I4sdSG0`,
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        setTopRated(data.results);
      }
    };
    fetchMovies();
  }, []);
  useEffect(() => {
    const fetchMovies = async () => {
      const url = `https://api.themoviedb.org/3/trending/all/day?language=en-US`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTE5OTc1ODQ2MjNhMzA5ZTAxNDZhOTFkNjdhMDMzZiIsIm5iZiI6MTc1MTM1NzA3Ny4zNzUsInN1YiI6IjY4NjM5Njk1MDNhZTliZGFmOWY4M2RmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cvL75faEssjtOWnf3fFKH87bnTW5zI8zfZX4I4sdSG0`,
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        setTrending(data.results); 
        console.log("hello");
      }
    };
    fetchMovies();
  }, []);

 
  
  useEffect(() => {
    const fetchMovies = async () => {
      const url = `https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTE5OTc1ODQ2MjNhMzA5ZTAxNDZhOTFkNjdhMDMzZiIsIm5iZiI6MTc1MTM1NzA3Ny4zNzUsInN1YiI6IjY4NjM5Njk1MDNhZTliZGFmOWY4M2RmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cvL75faEssjtOWnf3fFKH87bnTW5zI8zfZX4I4sdSG0`,
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        setOnTheAir(data.results);
      }
    };
    fetchMovies();
  }, []);
  useEffect(() => {
    const fetchPopularShows = async () => {
      const url = `https://api.themoviedb.org/3/tv/popular?language=en-US&page=1`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTE5OTc1ODQ2MjNhMzA5ZTAxNDZhOTFkNjdhMDMzZiIsIm5iZiI6MTc1MTM1NzA3Ny4zNzUsInN1YiI6IjY4NjM5Njk1MDNhZTliZGFmOWY4M2RmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cvL75faEssjtOWnf3fFKH87bnTW5zI8zfZX4I4sdSG0`,
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        setPopularShows(data.results);
      }
    };
    fetchPopularShows();
  }, []);

  function handleSelected() {
    if (selected === "tv") {
      setSelected("movie");
    } else {
      setSelected("tv");
    }
  }

  // Card renderers for each slider
  const handleCardClick = (
    show: ShowResponse,
    fallbackType: "movie" | "tv" = "movie"
  ) => {
    const type = show.media_type || fallbackType;
    navigate(`/movie/${type}/${show.id}`);
  };

  const renderShowCard = (
    show: ShowResponse,
    fallbackType: "movie" | "tv" = "movie"
  ) => (
    <div
      key={show.id}
      className=" max-w-[650px] flex-shrink-0 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
      onClick={() => handleCardClick(show, fallbackType)}
    >
      <img
        src={`https://image.tmdb.org/t/p/original/${show.poster_path}`}
        alt=""
        className="w-full h-[200px] object-contain rounded-md"
      />
    </div>
  );

  // Play trailer popup logic
  const handlePlayTrailer = async () => {
    if (!randomMovie) return;
    setTrailerLoading(true);
    setTrailerError(null);
    setShowTrailer(true);
    try {
      const type = randomMovie.media_type || selected;
      const url = `https://api.themoviedb.org/3/${type}/${randomMovie.id}/videos?language=en-US`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTE5OTc1ODQ2MjNhMzA5ZTAxNDZhOTFkNjdhMDMzZiIsIm5iZiI6MTc1MTM1NzA3Ny4zNzUsInN1YiI6IjY4NjM5Njk1MDNhZTliZGFmOWY4M2RmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cvL75faEssjtOWnf3fFKH87bnTW5zI8zfZX4I4sdSG0`,
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      type TMDBVideo = { key: string; site: string; type: string };
      const trailer = (data.results || []).find(
        (v: TMDBVideo) => v.site === "YouTube" && v.type === "Trailer"
      );
      if (trailer) {
        setTrailerKey(trailer.key);
      } else {
        setTrailerError("No trailer found.");
        setTrailerKey(null);
      }
    } catch {
      setTrailerError("Failed to load trailer.");
      setTrailerKey(null);
    } finally {
      setTrailerLoading(false);
    }
  };

  // Close trailer modal
  const closeTrailer = () => {
    setShowTrailer(false);
    setTrailerKey(null);
    setTrailerError(null);
    setTrailerLoading(false);
  };

  return (
    <div className="w-full relative">
      {/* Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative w-full max-w-3xl aspect-video bg-black rounded-lg shadow-lg flex items-center justify-center">
            <button
              onClick={closeTrailer}
              className="absolute top-2 right-2 z-10 bg-white/20 hover:bg-white/40 text-white rounded-full p-2"
            >
              ✕
            </button>
            {trailerLoading ? (
              <span className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></span>
            ) : trailerKey ? (
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&rel=0`}
                title="Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg"
              ></iframe>
            ) : (
              <div className="text-white text-center">
                {trailerError || "No trailer found."}
              </div>
            )}
          </div>
        </div>
      )}
      <div
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${
            randomMovie?.backdrop_path as string
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="min-h-screen w-full  flex justify-start items-center relative z-0  px-4 sm:px-6 lg:px-16"
      >
        <div className="absolute left-0 right-0 bg-black/70 h-screen z-0"></div>
        <div className="max-w-xl z-20 space-y-4 md:space-y-6">
          <h1 className="font-extrabold text-7xl tracking-wide leading-20 text-start">
            {selected === "tv"
              ? randomMovie?.original_name
              : randomMovie?.original_title}
          </h1>
          <p className="text-muted-foreground text-sm tracking-wide leading-5">
            {randomMovie?.overview}
          </p>
          <div className="flex items-center gap-4">
            <button
              className="bg-white px-4 py-2 rounded-md text-white font-semibold flex items-center gap-2"
              onClick={handlePlayTrailer}
            >
              <Play color="#000" />
              <span className="text-black">Play</span>
            </button>
            <button
              className="bg-white/10 px-4 py-2 rounded-md text-white font-semibold flex items-center gap-2"
              onClick={() => {
                const type = randomMovie?.media_type || selected;
                navigate(`/movie/${type}/${randomMovie?.id}`);
              }}
            >
              <Info />
              <span>More Info</span>
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 right-0 bg-white/10 px-2 py-2 border-l-4 border-l-white/50 z-20">
          <button
            onClick={handleSelected}
            className="text-sm font-medium flex items-center gap-2"
          >
            <RotateCw />
            {selected === "tv" ? "Movies" : "Tv Shows"}
          </button>
        </div>
      </div>

      {/* Trending */}
      <Slider
        title="Trending Movies"
        items={trending}
        renderItem={(show) => renderShowCard(show, show.media_type || "tv")}
      />
      {/* Popular Movies */}
      <Slider
        title="Popular Movies"
        items={popular}
        renderItem={(show) => renderShowCard(show, "movie")}
      />
      {/* Top Rated Movies */}
      <Slider
        title="Top Rated Movies"
        items={topRated}
        renderItem={(show) => renderShowCard(show, "movie")}
      />
      {/* On the Air Shows */}
      <Slider
        title="Shows On the Air"
        items={onTheAir}
        renderItem={(show) => renderShowCard(show, "tv")}
      />
      {/* Popular Shows */}
      <Slider
        title="Popular Shows"
        items={popularShows}
        renderItem={(show) => renderShowCard(show, "tv")}
      />
    </div>
  );
}
