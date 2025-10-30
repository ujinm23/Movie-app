"use client";

import React from "react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { StarIcon } from "../../_icons/StarIcon";
import { PlayIcon } from "../../_icons/PlayIcon";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { LoadingMovieList } from "./LoadingMovieList";
const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export function HeroSection() {
  const [loading, setLoading] = useState(false);
  const [nowPlayingDataList, setNowPlayingDataList] = useState([]);
  const getPopularDataList = async () => {
    setLoading(true);

    const nowPlayingEndpoint = `${BASE_URL}/movie/now_playing?language=en-US&page=1`;

    const response = await fetch(nowPlayingEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    setNowPlayingDataList(data.results);
    setLoading(false);
  };

  useEffect(() => {
    getPopularDataList();
  }, []);

  if (loading) {
    console.log(<LoadingMovieList />);
  }

  return (
    <Carousel className="relative w-[1440px] h-[600px] overflow-hidden">
      <CarouselContent>
        {nowPlayingDataList.slice(0, 3).map((movie, index) => (
          <CarouselItem key={index}>
            <div className="">
              <Card>
                <CardContent className="p-0">
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.title}
                    className="w-[1440px] h-[600px] object-cover"
                  />
                  <div className="left-[140px] absolute top-[178px] text-[#FFFFFF] flex flex-col gap-[16px]">
                    <div>
                      <p className=" font-normal text-[16px]">Now Playing:</p>
                      <span className="text-4xl inter font-bold">
                        {movie.title}
                      </span>
                      <div className="flex">
                        <StarIcon />
                        <span>{movie.vote_average}</span>
                        <p>/10</p>
                      </div>
                    </div>
                    <div className="w-[302px]">{movie.description}</div>
                    <button className="h-[40px] w-[145px] bg-[#F4F4F5] rounded-md text-[#18181B] flex items-center justify-center font-medium text-[14px] gap-[8px]">
                      <PlayIcon />
                      Watch Trailer
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute top-1/2 left-6  bg-[#F4F4F5] text-white rounded-full p-3 flex items-center justify-center" />
      <CarouselNext className="absolute top-1/2 right-6  bg-[#F4F4F5] text-white rounded-full p-3 flex items-center justify-center" />
    </Carousel>
  );
}
