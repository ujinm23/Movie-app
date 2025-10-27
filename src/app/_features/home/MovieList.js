"use client";

import { StarIcon } from "../../_icons/StarIcon";
import { LoadingMovieList } from "./LoadingMovieList";
import { useEffect, useState } from "react";
import { MovieCard } from "../../_components/MovieCard";
import { ArrowRight } from "../../_icons/ArrowRight";
import { useRouter } from 'next/router'

const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export const MovieList = ( props ) => {
  const { type } = props;

  const router = useRouter();

  const [popularMoviesData, setPopularMoviesData] = useState([]);

  const [loading, setLoading] = useState(false);

  const getPopularDataList = async () => {
    setLoading(true);
    const popularEndpoint = `${BASE_URL}/movie/${type}?language=en-US&page=1`;
    const response = await fetch(popularEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    setPopularMoviesData(data.results);

    setLoading(false);
  };

  useEffect(() => {
    console.log("page running");
    getPopularDataList();
  }, []);

  if (loading) {
    return <LoadingMovieList />;
  }

  const handleSeeMoreButton = () => {
    router.push(`/movies/${type}`);
  };


  return (
    <div className="  w-[1277px] h-[978px] flex flex-col justify-between">
      <div className="flex justify-between">
        <h3 className="font-semibold inter text-[24px]">
          {type.toUpperCase()}
        </h3>
        <div className="flex h-[36px] py-2 px-4 justify-center items-center gap-2" >
          <button
            className="flex items-center text-[14px] text-[#09090B] gap-[8px]
        onClick={handleSeeMoreButton}"
          >
            See More
          </button>
          <ArrowRight />
        </div>
      </div>
      <div className=" w-[1277px] h-[910px] overflow-hidden ">
        <div className="grid grid-rows-2 grid-cols-5 gap-[32px] top-[191px] left-[52px]">
          {popularMoviesData?.map((movie, index) => {
            return (
              <MovieCard
                key={index}
                title={movie.title}
                imageURL={movie.poster_path}
                rating={movie.vote_average}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
