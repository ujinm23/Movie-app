"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "@/app/_features/Header";
import { Footer } from "@/app/_features/Footer";
import { MovieCard } from "@/app/_components/MovieCard";
import {MovieCardSkeleton} from "@/app/_components/MovieCardSkeleton"
import { ACCESS_TOKEN, BASE_URL } from "@/constants";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function SimilarMoviesPage() {
  const { id } = useParams();
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [movieTitle, setMovieTitle] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // optional: total pages from API

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // set loading true whenever page changes
      try {
        // Get movie details for the title (only once is enough)
        if (movieTitle === "") {
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
        }

        // Get similar movies for current page
        const similarResponse = await fetch(
          `${BASE_URL}/movie/${id}/similar?language=en-US&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );
        const similarData = await similarResponse.json();
        setSimilarMovies(similarData.results || []);
        setTotalPages(similarData.total_pages || 1);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, page]); // fetch again whenever page changes

  // Optional: clamp page to valid range
  const goToPage = (p) => {
    if (p >= 1 && p <= totalPages) {
      setPage(p);
    }
  };

  return (
    <div className="flex flex-col items-center gap-[52px]">
      <Header />
      <div className="w-[1280px] flex flex-col gap-8">
        <h2 className="text-[30px] font-semibold ">More like this</h2>

       {loading ? (
  <div className="overflow-hidden h-[455px]">
    <div className="grid grid-cols-5 grid-rows-2 gap-8">
      {Array.from({ length: 10 }).map((_, idx) => (
        <MovieCardSkeleton key={idx} size="large" />
      ))}
    </div>
  </div>
) : similarMovies.length === 0 ? (
  <div className="text-center py-20 text-muted-foreground">
    No similar movies found
  </div>
): (
          <div className="overflow-hidden h-227.5 ">
            <div className="grid grid-cols-5 grid-rows-2 gap-8">
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
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="w-320 flex justify-end">
         <Pagination className="flex justify-end px-[15px]">
                <PaginationContent className="w-[426px] justify-between flex">
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={() => {
                        if (page > 1) setPage(page - 1);
                      }}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      isActive={page === 1}
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(1);
                      }}
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      isActive={page === 2}
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(2);
                      }}
                    >
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      isActive={page === 3}
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(3);
                      }}
                    >
                      3
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      isActive={page === 7}
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(7);
                      }}
                    >
                      7
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(page + 1);
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
      </div>

      <Footer />
    </div>
  );
}
