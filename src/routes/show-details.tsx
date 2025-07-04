import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Slider } from "@/components/general/slider";

interface ShowDetailsData {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  genres?: { id: number; name: string }[];
  production_companies?: {
    id: number;
    name: string;
    logo_path: string | null;
  }[];
}

interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface Season {
  id: number;
  season_number: number;
  name: string;
  poster_path: string | null;
  episode_count: number;
}

interface Episode {
  id: number;
  name: string;
  still_path: string | null;
  overview: string;
  episode_number: number;
}

export default function ShowDetails() {
  const { show_type, movie_id } = useParams();
  const [data, setData] = useState<ShowDetailsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trailer, setTrailer] = useState<Video | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [episodesLoading, setEpisodesLoading] = useState(false);
  const [episodesError, setEpisodesError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [similar, setSimilar] = useState<ShowDetailsData[]>([]);

  useEffect(() => {
    if (!show_type || !movie_id) return;
    setLoading(true);
    setError(null);
    setData(null);
    setTrailer(null);
    setCast([]);
    setSeasons([]);
    setSelectedSeason(null);
    setEpisodes([]);
    setEpisodesLoading(false);
    setEpisodesError(null);
    const fetchAll = async () => {
      const detailsUrl = `https://api.themoviedb.org/3/${show_type}/${movie_id}?language=en-US`;
      const videosUrl = `https://api.themoviedb.org/3/${show_type}/${movie_id}/videos?language=en-US`;
      const creditsUrl = `https://api.themoviedb.org/3/${show_type}/${movie_id}/credits?language=en-US`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTE5OTc1ODQ2MjNhMzA5ZTAxNDZhOTFkNjdhMDMzZiIsIm5iZiI6MTc1MTM1NzA3Ny4zNzUsInN1YiI6IjY4NjM5Njk1MDNhZTliZGFmOWY4M2RmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cvL75faEssjtOWnf3fFKH87bnTW5zI8zfZX4I4sdSG0",
        },
      };
      try {
        // Fetch details, videos, and credits in parallel
        const [detailsRes, videosRes, creditsRes] = await Promise.all([
          fetch(detailsUrl, options),
          fetch(videosUrl, options),
          fetch(creditsUrl, options),
        ]);
        const details = await detailsRes.json();
        const videos = await videosRes.json();
        const credits = await creditsRes.json();
        if (!detailsRes.ok)
          throw new Error(details.status_message || "Failed to fetch details");
        setData(details);
        // Find trailer (YouTube preferred)
        const trailerVid = (videos.results || []).find(
          (v: Video) => v.site === "YouTube" && v.type === "Trailer"
        );
        setTrailer(trailerVid || null);
        // Get top 10 cast
        setCast((credits.cast || []).slice(0, 10));
        // Fetch seasons for TV shows
        if (show_type === "tv" && details.seasons) {
          setSeasons(
            details.seasons.filter((s: Season) => s.season_number > 0)
          );
          setSelectedSeason(
            details.seasons.find((s: Season) => s.season_number > 0)
              ?.season_number || null
          );
        }
      } catch {
        setError("Failed to fetch details");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [show_type, movie_id]);

  // Fetch episodes for selected season
  useEffect(() => {
    if (show_type !== "tv" || !movie_id || !selectedSeason) return;
    setEpisodes([]);
    setEpisodesLoading(true);
    setEpisodesError(null);
    const fetchEpisodes = async () => {
      const url = `https://api.themoviedb.org/3/tv/${movie_id}/season/${selectedSeason}?language=en-US`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTE5OTc1ODQ2MjNhMzA5ZTAxNDZhOTFkNjdhMDMzZiIsIm5iZiI6MTc1MTM1NzA3Ny4zNzUsInN1YiI6IjY4NjM5Njk1MDNhZTliZGFmOWY4M2RmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cvL75faEssjtOWnf3fFKH87bnTW5zI8zfZX4I4sdSG0",
        },
      };
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (response.ok && data.episodes) {
          setEpisodes(data.episodes);
        } else {
          setEpisodesError("Failed to fetch episodes");
        }
      } catch {
        setEpisodesError("Failed to fetch episodes");
      } finally {
        setEpisodesLoading(false);
      }
    };
    fetchEpisodes();
  }, [show_type, movie_id, selectedSeason]);

  // Fetch similar titles
  useEffect(() => {
    if (!show_type || !movie_id) return;
    setSimilar([]);
    const fetchSimilar = async () => {
      const url = `https://api.themoviedb.org/3/${show_type}/${movie_id}/similar?language=en-US&page=1`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTE5OTc1ODQ2MjNhMzA5ZTAxNDZhOTFkNjdhMDMzZiIsIm5iZiI6MTc1MTM1NzA3Ny4zNzUsInN1YiI6IjY4NjM5Njk1MDNhZTliZGFmOWY4M2RmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cvL75faEssjtOWnf3fFKH87bnTW5zI8zfZX4I4sdSG0",
        },
      };
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (response.ok && data.results) {
          setSimilar(data.results);
        }
      } catch {
        setSimilar([]);
      }
    };
    fetchSimilar();
  }, [show_type, movie_id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></span>
      </div>
    );
  if (error)
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  if (!data) return null;

  // Card renderer for similar titles
  const renderSimilarCard = (item: ShowDetailsData) => (
    <div
      key={item.id}
      className="max-w-[200px] flex-shrink-0 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
      onClick={() => navigate(`/movie/${show_type}/${item.id}`)}
    >
      <img
        src={
          item.poster_path
            ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
            : ""
        }
        alt={item.title || item.name}
        className="w-full h-[300px] object-cover rounded-md"
      />
      <div className="mt-2 text-white text-sm font-semibold line-clamp-2">
        {item.title || item.name}
      </div>
    </div>
  );

  return (
    <div className="w-full ">
      <div>
        {/* Trailer */}
        {trailer && (
          <div className="mb-8 aspect-video w-full rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={trailer.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
        <img
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          alt={data.title || data.name}
          className="w-64 h-auto rounded-lg shadow-lg mx-auto md:mx-0"
        />
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-bold">{data.title || data.name}</h1>
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            {data.release_date || data.first_air_date}
            {data.genres &&
              data.genres.map((g) => (
                <span
                  key={g.id}
                  className="bg-white/10 px-2 py-1 rounded text-xs"
                >
                  {g.name}
                </span>
              ))}
          </div>
          <div className="text-lg text-muted-foreground">
            <span className="font-semibold">Rating:</span> {data.vote_average}
          </div>
          <p className="text-base mt-2">{data.overview}</p>
          {/* Production Companies */}
          {data.production_companies &&
            data.production_companies.length > 0 && (
              <div className="mt-4">
                <h2 className="text-lg font-semibold mb-2">
                  Production Companies
                </h2>
                <div className="flex flex-wrap gap-4 items-center">
                  {data.production_companies.map((company) => (
                    <div key={company.id} className="flex items-center gap-2">
                      {company.logo_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/w45${company.logo_path}`}
                          alt={company.name}
                          className="h-6 w-auto object-contain bg-white/10 rounded"
                        />
                      )}
                      <span className="text-xs text-muted-foreground">
                        {company.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>
      {/* Cast */}
      {cast.length > 0 && (
        <div className="mt-8 max-w-7xl mx-auto">
          <h2 className="text-lg font-semibold mb-2">Top Cast</h2>
          <div className="flex flex-wrap gap-4">
            {cast.map((member) => (
              <div key={member.id} className="flex flex-col items-center w-20">
                {member.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
                    alt={member.name}
                    className="w-16 h-16 object-cover rounded-full mb-1"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-xs text-muted-foreground mb-1">
                    N/A
                  </div>
                )}
                <span className="text-xs text-center font-medium line-clamp-2">
                  {member.name}
                </span>
                <span className="text-xs text-muted-foreground text-center line-clamp-2">
                  {member.character}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* TV Episodes Section */}
      {show_type === "tv" && seasons.length > 0 && (
        <div className="mt-10 max-w-7xl mx-auto">
          <h2 className="text-lg font-semibold mb-4">Episodes</h2>
          <div className="flex flex-wrap gap-2 mb-4 overflow-x-auto pb-2">
            {seasons.map((season) => (
              <button
                key={season.id}
                className={`px-3 py-1 rounded bg-white/10 text-white text-xs font-medium border border-white/20 hover:bg-white/20 transition-all ${
                  selectedSeason === season.season_number
                    ? "bg-white/30 border-white/40"
                    : ""
                }`}
                onClick={() => setSelectedSeason(season.season_number)}
              >
                {season.name}
              </button>
            ))}
          </div>
          {episodesLoading ? (
            <div className="flex justify-center items-center h-32">
              <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></span>
            </div>
          ) : episodesError ? (
            <div className="text-red-500 text-center">{episodesError}</div>
          ) : episodes.length > 0 ? (
            <div className="flex flex-col divide-y divide-white/10 bg-white/0 rounded-lg">
              {episodes.map((ep) => (
                <div key={ep.id} className="flex gap-4 py-4 items-start">
                  {ep.still_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w300${ep.still_path}`}
                      alt={ep.name}
                      className="w-32 h-20 object-cover rounded"
                    />
                  ) : (
                    <div className="w-32 h-20 bg-white/10 rounded flex items-center justify-center text-xs text-muted-foreground">
                      N/A
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="font-semibold text-base mb-1 line-clamp-1">
                      {ep.episode_number}. {ep.name}
                    </div>
                    <div className="text-xs text-muted-foreground line-clamp-3">
                      {ep.overview}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-muted-foreground text-center">
              No episodes found.
            </div>
          )}
        </div>
      )}
      {/* Similar Titles Slider */}
      {similar.length > 0 && (
        <div className="mt-12 ">
          <Slider
            title="Similar Titles"
            items={similar}
            renderItem={renderSimilarCard}
          />
        </div>
      )}
    </div>
  );
}
