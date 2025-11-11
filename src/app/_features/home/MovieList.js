"use client";

import { StarIcon } from "../../_icons/StarIcon";
import { LoadingMovieList } from "./LoadingMovieList";
import { useEffect, useState } from "react";
import { MovieCard } from "../../_components/MovieCard";
import { ArrowRight } from "../../_icons/ArrowRight";
import { useRouter } from "next/navigation";
import { ACCESS_TOKEN, BASE_URL } from "@/constants";

export const MovieList = ({ type, seeMore }) => {
  const router = useRouter();
  const [popularMoviesData, setPopularMoviesData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPopularDataList = async () => {
    setLoading(true);
    const allResults = [];

    for (let page = 1; page <= 3; page++) {
      const popularEndpoint = `${BASE_URL}/movie/${type}?language=en-US&page=${page}`;
      const response = await fetch(popularEndpoint, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      allResults.push(...data.results);
    }

    setPopularMoviesData(allResults);
    setLoading(false);
  };

  useEffect(() => {
    getPopularDataList();
  }, []);

  if (loading) {
    return <LoadingMovieList />;
  }

  const handleSeeMoreButton = () => {
    router.push(`/movies/${type}`);
  };

  return (
    <div className="w-[1277px] h-[978px] flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold inter text-[24px]">
          {type.toUpperCase()}
        </h3>
        {seeMore && (
          <button
            onClick={handleSeeMoreButton}
            className="flex justify-center items-center p-0 h-[36px] text-[14px] text-[#09090B] gap-[8px]"
          >
            <p className="w-[64px] font-medium text-[#09090B]">See More</p>
            <ArrowRight />
          </button>
        )}
      </div>

      <div className="w-[1277px] h-[910px] overflow-hidden">
        <div className="grid grid-rows-2 grid-cols-5 gap-[32px] top-[191px] left-[52px]">
          {popularMoviesData.map((movie, index) => (
            <MovieCard
              key={index}
              title={movie.title}
              imageURL={movie.poster_path}
              rating={movie.vote_average}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
