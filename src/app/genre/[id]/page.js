"use client";
import { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Header } from "@/app/_features/Header";
import { MovieCard } from "@/app/_components/MovieCard";
import { Footer } from "@/app/_features/Footer";
import { ChevronRight2 } from "@/app/_icons/ChevronRight2";
import { Seperator2 } from "@/app/_icons/Seperator2";
import { LoadingMovieList } from "@/app/_features/home/LoadingMovieList";
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

export default function GenreType() {
  const { id } = useParams();
  const router = useRouter();
  const [genre, setGenre] = useState([]);
  const [genreResults, setGenreResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);

  const getGenreResults = async () => {
    try {
      const genreResultsEndpoint = `${BASE_URL}/discover/movie?language=en&with_genres=${id}&page=${page}`;

      const response = await fetch(genreResultsEndpoint, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data, "data.results");
      setGenreResults(data.results || []);
      setTotalResults(data.total_results);
    } catch (error) {
      console.error("Error fetching genre results:", error);
    }
  };

  const getGenreData = async () => {
    try {
      const genreEndpoint = `${BASE_URL}/genre/movie/list?language=en`;
      const response = await fetch(genreEndpoint, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setGenre(data.genres || []);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };
  useEffect(() => {
    getGenreResults();
    getGenreData();
  }, [page, id]);

  const filteredGenre = genre.find((g) => g.id == id);

  if (loading) {
    return <LoadingMovieList />;
  }

  return (
    <div className="flex flex-col items-center gap-[52px] ">
      <Header />
      <div className="w-[1280px] flex flex-col justify-center gap-[35px]">
        <p className="text-[30px] font-semibold">Search Filter</p>
        <div className="flex">
          <div className="w-[387px] flex flex-col gap-[30px]">
            <div className="h-[36px]">
              <h3 className="font-semibold text-[24px]">Genres</h3>
              <p>See lists of movies by genre</p>
            </div>
            <div className="flex flex-wrap gap-[16px] mt-[10px]">
              {genre.length > 0 ? (
                genre.map((genre) => (
                  <div
                    key={genre.id}
                    onClick={() => router.push(`/genre/${genre.id}`)}
                    className="flex items-center border border-[#E4E4E7] rounded-full gap-[11px] px-[10px] cursor-pointer hover:bg-[#F4F4F5] transition w-fit"
                  >
                    <p className="text-[12px] inter font-semibold text-[#09090B]  mr-1">
                      {genre.name}
                    </p>
                    <ChevronRight2 />
                  </div>
                ))
              ) : (
                <p className="text-gray-400">Loading...</p>
              )}
            </div>
          </div>
          <Seperator2 />
          <div className="w-[806px] h-[1189px] flex flex-col gap-[32px]">
            <div className="text-[20px] h-[28px] font-semibold">
              {totalResults} titles in &quot;{filteredGenre?.name}&quot;
            </div>

            <div className="overflow-hidden h-[1057px] ">
              <div className="grid grid-cols-4 grid-rows-3 gap-[32px]">
                {genreResults.map((movie, index) => (
                  <div key={index}>
                    <MovieCard
                      key={index}
                      title={movie.title}
                      imageURL={movie.poster_path}
                      rating={movie.vote_average}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
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
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
