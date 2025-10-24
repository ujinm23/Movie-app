"use client";

import { StarIcon } from "../../_icons/StarIcon";
import { LoadingMovieList } from "./LoadingMovieList";
import { useEffect, useState } from "react";
import { MovieCard } from "../../_components/MovieCard";
import {ArrowRight} from "../../_icons/ArrowRight";

const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export const TopRatedMovieList = (F) => {
  const [TopRatedMoviesData, setTopRatedMoviesData] = useState([]);

  const [loading, setLoading] = useState(false);

  const getTopRatedDataList = async () => {
    setLoading(true);
    const TopRatedEndpoint = `${BASE_URL}/movie/top_rated?language=en-US&page=1`;
    const response = await fetch(TopRatedEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    setTopRatedMoviesData(data.results);

    setLoading(false);
  };

  useEffect(() => {
    console.log("page running");
    getTopRatedDataList();
  }, []);

  if (loading) {
    return <LoadingMovieList />;
  }

  function MovieCard(props) {
    const { title, imageURL, rating } = props;
    return (
      <div className="w-[229.73px] h-[439px] bg-[#F4F4F5] rounded flex flex-col justify-end">
        <div
          style={{
            backgroundImage: `url('https://image.tmdb.org/t/p/original${imageURL}')`,
          }}
          className={`w-[229.73px] h-[340px] bg-center bg-cover`}
        ></div>
        <div className="w-[229.73px] h-[95px] p-[8px]">
           <div className="flex flex-col items-start">
            <div className="flex ">
              <StarIcon className="w-[16px] h-[18px] object-contain" />
              <p className="font-medium">{rating}</p>
              <p className="text-[#71717A] text-[12px]">/10</p>
            </div>
            <p>{title}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="  w-[1277px] h-[978px] flex flex-col justify-between">
      <div className="flex justify-between">
        <h3 className="font-semibold inter text-[24px]">Top Rated</h3>
        <div className="flex items-center text-[14px] text-[#09090B] gap-[8px]">See More 
            <ArrowRight/>
            </div>
        </div>
      <div className=" w-[1277px] h-[910px] overflow-hidden ">
        <div className="grid grid-rows-2 grid-cols-5 gap-[32px] top-[191px] left-[52px]">
          {TopRatedMoviesData.map((movie, index) => {
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
