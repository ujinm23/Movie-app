"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN = "YOUR_ACCESS_TOKEN_HERE";

export default function MoviesTypePage() {
  const params = useParams();
  const type = params.type;

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/movie/${type}?language=en-US&page=${page}`, {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
      });
      const data = await response.json();
      setMovies(data.results || []);
      setLoading(false);
    };
    fetchMovies();
  }, [type, page]);

  return (
    <div>
      <h1>{type.toUpperCase()}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
