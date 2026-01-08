"use client";

import React from "react";
import { StarIcon } from "../../_icons/StarIcon";
import { PlayIcon } from "../../_icons/PlayIcon";
import { Card, CardContent } from "@/components/ui/card";
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
import { ACCESS_TOKEN, BASE_URL } from "@/constants";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { LoadingMovieList } from "./LoadingMovieList";
import { HeroSkeletonCard } from "@/app/_components/HeroSkeleton";

export function HeroSection() {
  const [loading, setLoading] = useState(false);
  const [heroSectionData, setHeroSectionData] = useState([]);

  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [movieTrailer, setMovieTrailer] = useState({});
  const [trailerLoading, setTrailerLoading] = useState(false);

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

  useEffect(() => {
    getHeroSectionData();
  }, []);

  const getMovieVideos = async () => {
    setTrailerLoading(true);
    const heroSectionEndpoint = `${BASE_URL}/movie/${selectedMovieId}/videos?language=en-US`;
    const response = await fetch(heroSectionEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-type": "application/json",
      },
    });

    const data = await response.json();

    setMovieTrailer(
      data.results.find((trailer) => {
        if (trailer.name.includes("Official Trailer")) {
          return trailer;
        }
      })
    );
    setTimeout(() => {
      setTrailerLoading(false);
    }, "2000");
  };

  useEffect(() => {
    console.log("id is getting change, call api again");
    if (selectedMovieId !== null) {
      getMovieVideos();
    }
  }, [selectedMovieId]);

  const handleWatchTrailerButton = (id) => {
    setSelectedMovieId(id);
  };

  if (loading)
    return (
      <div>
        <HeroSkeletonCard />
      </div>
    );

  console.log(movieTrailer, "movieTrailermovieTrailermovieTrailer");

  return (
    <div className="flex justify-center items-center w-full">
      <Carousel className="w-[1440px] h-[600px] overflow-hidden">
        <CarouselContent>
          {heroSectionData.slice(0, 3).map((movie, index) => (
            <CarouselItem key={index}>
              <div className="">
                <Card>
                  <CardContent
                    className="p-0 w-[1440px] min-h-[600px] bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                    }}
                  >
                    <div className="text-[#FFFFFF] dark:text-[#FFFFFF] flex w-[404px] flex-col gap-[16px] pl-[140px] pt-[144px]">
                      <div className="flex flex-col gap-0">
                        <p className=" font-normal text-[16px]">Now Playing:</p>
                        <span className="text-[36px] w-[404px] inter font-bold text-sm/10">
                          {movie.title}
                        </span>
                        <div className="flex text-[18px] items-center">
                          <StarIcon className=" text-[#FDE047] dark:text-[#FAFAFA]" />
                          <span className="font-semibold">
                            {Number(movie.vote_average).toFixed(1)}
                          </span>
                          <p className="font-normal text-[#71717A]">/10</p>
                        </div>
                      </div>
                      <div className="w-[302px] text-[12px]">
                        {movie.overview}
                      </div>
                      <Dialog>
                        <form>
                          <DialogTrigger
                            asChild
                            className="h-[40px] w-[145px] bg-[#F4F4F5] rounded-md text-[#18181B] flex items-center justify-center font-medium text-[14px] gap-[8px]"
                          >
                            <button
                              onClick={() => handleWatchTrailerButton(movie.id)}
                              style={{ cursor: "pointer" }}
                            >
                              <PlayIcon />
                              Watch Trailer
                            </button>
                          </DialogTrigger>
                          <DialogContent className="h-[562px] w-[997px] p-0 flex justify-center items-center object-cover bg-[#F4F4F5]">
                            <DialogTitle className="display: hidden">
                              {movie.title}
                            </DialogTitle>
                            <div>
                              <iframe
                                width={997}
                                height={562}
                                src={`https://www.youtube.com/embed/${movieTrailer.key}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                            </div>
                          </DialogContent>
                        </form>
                      </Dialog>
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
      {/* 
      {selectedMovieId && trailerLoading && <div>trailer loading</div>}
      {selectedMovieId && !trailerLoading && (
        <div>
          <iframe
            width={560}
            height={315}
            src={`https://www.youtube.com/embed/${movieTrailer.key}`}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )} */}
    </div>
  );
}
