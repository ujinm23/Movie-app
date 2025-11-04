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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export function HeroSection() {
  const [heroSectionData, setHeroSectionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [movieTrailer, setMovieTrailer] = useState([]);
  const [trailerLoading, setTrailerLoading] = useState(false);
  const [nowPlayingDataList, setNowPlayingDataList] = useState([]);

  const getHeroSectionData = async () => {
    setLoading(true);

    const heroSectionEndpoint = `${BASE_URL}/movie/now_playing?language=en-US&page=1`;
    const response = await fetch(heroSectionEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    setHeroSectionData(data.results);
    setTimeout(() => {
      setLoading(false);
    }, "2000");
  };

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

  const getMovieVideos = async () => {
    setTrailerLoading(true);
    const heroSectionEndpoint = `${BASE_URL}/movie/${selectedMovieId}/videos?language=en-US`;
    const response = await fetch(heroSectionEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data, "movie videos");

    setMovieTrailer(data.results);
    setTimeout(() => {
      setTrailerLoading(false);
    }, "2000");
  };

  useEffect(() => {
    if (selectedMovieId) {
      getMovieVideos();
    }
  }, [selectedMovieId]);

  const handleWatchTrailerButton = (id) => {
    setSelectedMovieId(id);
  };

  if (loading) {
    return (
      <div>
        <LoadingMovieList />
      </div>
    );

    const movieTrailer =
      !trailerLoading &&
      movieTrailer.find((trailer) => {
        if (trailer.name.includes("Official Trailer")) {
          return trailer;
        }
      });
  }
  console.log(movieTrailer, "now playing data list");
  return (
    <div>
      <Carousel className="w-[1440px] h-[600px] overflow-hidden">
        <CarouselContent>
          {nowPlayingDataList.slice(0, 3).map((movie, index) => (
            <CarouselItem key={index}>
              <div className="">
                <Card>
                  <CardContent
                    className="p-0 w-[1440px] min-h-[600px] bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                    }}
                  >
                    <div className="text-[#FFFFFF] flex w-[404px] flex-col gap-[16px] pl-[140px] pt-[144px]">
                      <div className="flex flex-col gap-0">
                        <p className=" font-normal text-[16px]">Now Playing:</p>
                        <span className="text-[36px] inter font-bold">
                          {movie.title}
                        </span>
                        <div className="flex text-[18px] items-center">
                          <StarIcon />
                          <span className="font-semibold">
                            {Number(movie.vote_average).toFixed(1)}
                          </span>
                          <p className="font-normal text-[#71717A]">/10</p>
                        </div>
                      </div>
                      <div className="w-[302px] text-[12px]">
                        {movie.overview}
                      </div>
                      <div className="h-[40px] w-[145px] bg-[#F4F4F5] rounded-md text-[#18181B] flex items-center justify-center font-medium text-[14px] gap-[8px]">
                        <PlayIcon />
                        <button
                          onClick={() => handleWatchTrailerButton(movie.id)}
                          style={{ cursor: "pointer" }}
                        >
                          Watch Trailer
                        </button>
                      </div>
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

      {selectedMovieId && trailerLoading && <div>trailer loading</div>}
      {selectedMovieId && !trailerLoading && (
        <div>
          <iframe
            width={560}
            height={315}
            src={`https://www.youtube.com/embed/${movieTrailer.key}`}
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      )}
    </div>
  );
}
