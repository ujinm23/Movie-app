"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "@/app/_features/Header";
import { Footer } from "@/app/_features/Footer";
import { useRouter } from "next/navigation";
import { MovieCard } from "@/app/_components/MovieCard";
import { Seperator3 } from "@/app/_icons/Seperator3";
import { StarIcon2 } from "@/app/_icons/StarIcon2";
import { ACCESS_TOKEN, BASE_URL } from "@/constants";

export default function MovieDetails() {
  const [loading, setLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState({});
  const { id } = useParams();
  const [movieActors, setMovieActors] = useState([]);
  const router = useRouter();

  const getSimilarMovies = async () => {
    setLoading(true);
    const endpoint = `${BASE_URL}/movie/${id}/similar?language=en-US&page=1`;
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setSimilarMovies(data.results || []);
    setLoading(false);
  };

  const getMovieActors = async () => {
    const movieActorsEndpoint = `${BASE_URL}/movie/${id}/credits?language=en-US`;
    const response = await fetch(movieActorsEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setMovieActors(data.cast || []);
  };
  console.log(movieActors, "movie actors");

  const getMovieDetails = async () => {
    setLoading(true);
    const movieDetails = `${BASE_URL}/movie/${id}?language=en-US`;
    const response = await fetch(movieDetails, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setMovieDetails(data || {});
    setTimeout(() => {
      setLoading(false);
    }, "2000");
  };
  console.log(movieDetails, "movie details");

  useEffect(() => {
    getMovieDetails();
    getMovieActors();
  }, [id]);

  return (
    <div className="flex flex-col gap-[52px] items-center">
      <Header />
      <div className="w-[1440px] flex flex-col items-center">
        <div className="w-[1080px] flex flex-col gap-[32px]">
          <div className="w-[1080px] h-[524px] flex flex-col gap-[24px]">
            <div className="h-[72px] justify-between items-center flex">
              <div className="w-auto h-[72px] flex flex-col gap-[4px]">
                <p className="text-[36px] font-extrabold line-height:[40px]">
                  {movieDetails.title}
                </p>
                <p className="text-[18px]">{movieDetails.release_date}</p>
              </div>
              <div className="w-[83px] h-[64px] flex-col flex">
                <p className="font-medium text-[12px]">Rating</p>
                <div className="flex w-[83px] h-[48px]">
                  <StarIcon2 className="w-[28px] h-[28px] object-cover" />
                  <div className="flex flex-col w-[51px] h-[44px]">
                    <div className="flex items-center">
                      <p className="font-semibold text-[18px]">
                        {Number(movieDetails.vote_average).toFixed(1)}
                      </p>
                      <p className="text-[16px] text-[#71717A]">/10</p>
                    </div>
                    <p className="text-[12px] text-[#71717A] font-normal">
                      {movieDetails.vote_count}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[1080px] h-[160px] flex gap-[32px]">
              <img
                className="w-[290px] h-[428px]"
                src={`https://image.tmdb.org/t/p/original${movieDetails?.poster_path}`}
              />
              <img
                className="w-[760px] h-[428px]"
                src={`https://image.tmdb.org/t/p/original${movieDetails?.backdrop_path}`}
              />
            </div>
          </div>
          <div className="w-[1080px] h-[271px] flex flex-col gap-[20px]">
            {/* {movieDetails.genres.length > 0 ? (
              movieDetails.genres.map((genre) => (
                <div
                  key={genre.id}
                  className="flex items-center border border-[#E4E4E7] rounded-full gap-[11px] px-[10px] cursor-pointer hover:bg-[#F4F4F5] transition w-fit"
                >
                  {genre.name}{" "}
                </div>
              ))
            ) : (
              <p className="text-gray-400">Loading...</p>
            )} */}
            <p>{movieDetails.overview}</p>
            <div className="gap-[53px] ">
              <div className="w-[64px] h-[28px] font-bold text-[16px]">
                Director
              </div>
              <p>{movieActors.name}</p>
              <Seperator3 />
            </div>
            <div className="gap-[53px]">
              <div className="w-[64px] h-[28px] font-bold text-[16px]">
                Writers
              </div>
              <Seperator3 />
            </div>
            <div className="gap-[53px]">
              <div className="w-[64px] h-[28px] font-bold text-[16px]">
                Stars
                <Seperator3 />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[1080px] h-[440px] flex flex-col gap-[32px] mb-[52px]">
          <p className="text-[24px] font-semibold">More like this</p>
          <div className="grid grid-cols-5 grid-rows-1 gap-[32px]">
            {/* {getSimilarMovies.map((movie, index) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                imageURL={movie.poster_path}
                rating={movie.vote_average}
              />
            ))} */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
