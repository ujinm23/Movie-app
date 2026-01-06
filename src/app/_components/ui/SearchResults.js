"use client";

import { useEffect, useRef, useState } from "react";
import { BASE_URL, ACCESS_TOKEN } from "@/constants";
import { useRouter } from "next/navigation";

export function SearchResults({ query, isOpen, onClose }) {
  const [moviesData, setMoviesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const router = useRouter();

  const fetchMovies = async () => {
    if (!query) return;
    
    setLoading(true);
    try {
      const endpoint = `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`;
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setMoviesData(data.results || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMoviesData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleMovieClick = (movieId) => {
    router.push(`/movieDetail/${movieId}`);
    onClose();
  };

  if (!isOpen || !query) return null;

  return (
    <div
      ref={ref}
      className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg max-h-[500px] overflow-y-auto z-50"
    >
      <div className="p-4">
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : moviesData.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            No results found for &quot;{query}&quot;
          </div>
        ) : (
          <div className="space-y-4">
            {moviesData.map((movie) => (
              <div
                key={movie.id}
                onClick={() => handleMovieClick(movie.id)}
                className="flex items-center gap-4 pb-4 border-b border-border last:border-b-0 cursor-pointer hover:bg-accent rounded p-2 transition-colors"
              >
                <div className="relative w-16 h-24 rounded overflow-hidden shrink-0 bg-muted">
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      No Image
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{movie.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"}
                  </p>
                  {movie.vote_average > 0 && (
                    <p className="text-sm text-muted-foreground">
                      ⭐ {movie.vote_average.toFixed(1)}/10
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}