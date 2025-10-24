"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY"; 

export function HeroSection() {
  const [movies, setMovies] = useState([]);

  const fetchNowPlaying = async () => {
    const response = await fetch(
      `${BASE_URL}/movie/now_playing?language=en-US&page=1`,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setMovies(data.results); 
  };

  useEffect(() => {
    fetchNowPlaying();
  }, []);

  return (
    <Carousel className="w-[1440px] h-[600px]">
      <CarouselContent>
        {movies.map((movie) => (
          <CarouselItem key={movie.id}>
            <div>
              <Card>
                <CardContent className="flex items-center justify-center p-0">
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    className="w-[1440px] h-[550px] flex justify-center items-center object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
