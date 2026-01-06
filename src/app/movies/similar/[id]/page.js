"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "@/app/_features/Header";
import { Footer } from "@/app/_features/Footer";
import { MovieCard } from "@/app/_components/MovieCard";
import { ACCESS_TOKEN, BASE_URL } from "@/constants";

export default function SimilarMoviesPage() {
  const { id } = useParams();
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [movieTitle, setMovieTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get movie details for the title
        const movieResponse = await fetch(
          `${BASE_URL}/movie/${id}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );
        const movieData = await movieResponse.json();
        setMovieTitle(movieData.title);

        // Get similar movies
        const similarResponse = await fetch(
          `${BASE_URL}/movie/${id}/similar?language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );
        const similarData = await similarResponse.json();
        setSimilarMovies(similarData.results || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div className="flex flex-col items-center gap-[52px]">
      <Header />

      <div className="w-[1080px] flex flex-col gap-8">
        <h2 className="text-[30px] font-semibold ">More like this</h2>

        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : similarMovies.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            No similar movies found
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-6">
            {similarMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movieId={movie.id}
                title={movie.title}
                rating={movie.vote_average}
                imageURL={movie.poster_path}
                size="large"
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
