import {
  ChevronDown,
  HeartIcon,
  LogOut,
  Settings2,
  Search,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ThemeToggle } from "./toggle-theme";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "./logo";
import { useEffect, useState, useRef } from "react";
import { Input } from "../ui/input";
import { Link, useNavigate } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  release_date?: string;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Select the main element
    const main = document.querySelector("main");
    if (!main) return;
    const handleScroll = () => {
      setScrolled(main.scrollTop > 0);
    };
    main.addEventListener("scroll", handleScroll);
    // Check initial scroll position
    setScrolled(main.scrollTop > 0);
    return () => {
      main.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Search movies from TMDB
  useEffect(() => {
    if (!search) {
      setResults([]);
      setShowDropdown(false);
      return;
    }
    const controller = new AbortController();
    const fetchMovies = async () => {
      const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        search
      )}&language=en-US&page=1&include_adult=false`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTE5OTc1ODQ2MjNhMzA5ZTAxNDZhOTFkNjdhMDMzZiIsIm5iZiI6MTc1MTM1NzA3Ny4zNzUsInN1YiI6IjY4NjM5Njk1MDNhZTliZGFmOWY4M2RmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cvL75faEssjtOWnf3fFKH87bnTW5zI8zfZX4I4sdSG0`,
        },
        signal: controller.signal,
      };
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (response.ok) {
          setResults(data.results || []);
          setShowDropdown(true);
        } else {
          setResults([]);
          setShowDropdown(false);
        }
      } catch {
        setResults([]);
        setShowDropdown(false);
      }
    };
    const timeout = setTimeout(fetchMovies, 400); // debounce
    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [search]);

  // Hide dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showDropdown]);

  return (
    <div
      className={`py-4 md:py-6  px-4 sm:px-6 lg:px-16 z-20 fixed top-0 w-full flex justify-between items-center transition-all duration-300 ${
        scrolled ? "backdrop-blur-md bg-black/60" : "bg-inherit"
      }`}
    >
      <Link to={"/"}>
        <Logo variant="gradient" />
      </Link>
      <div className="flex items-center gap-4 md:gap-8 w-full max-w-2xl justify-end relative">
        {/* Search Box */}
        <div className="relative w-64">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-2 bg-white/10 text-white placeholder:text-white/60 border border-white/20 focus:border-white/40"
            onFocus={() => search && setShowDropdown(true)}
          />
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-white/60 size-5 pointer-events-none" />
          {showDropdown && results.length > 0 && (
            <div
              ref={dropdownRef}
              className="absolute mt-2 w-full bg-black/90 rounded-md shadow-lg z-50 max-h-72 overflow-y-auto border border-white/10"
            >
              {results.map((movie) => (
                <div
                  key={movie.id}
                  className="px-4 py-2 hover:bg-white/10 cursor-pointer flex items-center gap-2"
                  onClick={() => {
                    navigate(`/movie/movie/${movie.id}`);
                    setShowDropdown(false);
                  }}
                >
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w45${movie.poster_path}`}
                      alt=""
                      className="w-8 h-12 object-cover rounded"
                    />
                  ) : (
                    <div className="w-8 h-12 bg-white/10 rounded flex items-center justify-center text-xs text-white/50">
                      N/A
                    </div>
                  )}
                  <span className="text-white text-sm line-clamp-1">
                    {movie.title}
                  </span>
                  <span className="text-white/40 text-xs ml-auto">
                    {movie.release_date?.slice(0, 4)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-end gap-1">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <ChevronDown className="size-6" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="z-50 min-w-[120px] space-y-1 py-2">
            <DropdownMenuItem className="gap-2">
              <HeartIcon className="size-4" />
              <span>Favorites</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <Settings2 className="size-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <LogOut className="size-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
