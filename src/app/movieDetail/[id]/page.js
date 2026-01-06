"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/app/_features/Header";
import { Footer } from "@/app/_features/Footer";
import { MovieCard } from "@/app/_components/MovieCard";
import { StarIcon2 } from "@/app/_icons/StarIcon2";
import { ACCESS_TOKEN, BASE_URL } from "@/constants";
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

export default function MovieDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [movieDetail, setMovieData] = useState(null);
  const [moviePeople, setPeople] = useState([]);
  const [movieTrailer, setMovieTrailer] = useState({});
  const [moreLike, setMore] = useState([]);
  const directorNames = moviePeople?.crew
    ?.filter((p) => p.job === "Director")
    .map((p) => p.name)
    .join(" · ");

  const writerNames = moviePeople?.crew
    ?.filter((p) => p.department === "Writing")
    .map((p) => p.name)
    .join(" · ");

  const starNames = moviePeople?.cast
    ?.slice(0, 3)
    .map((p) => p.name)
    .join(" · ");

  const getPeopleData = async () => {
    const moviesPeople = `${BASE_URL}/movie/${id}/credits?language=en-US`;
    const response = await fetch(moviesPeople, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setPeople(data);
  };

  const getMovieData = async () => {
    const movieDetails = `${BASE_URL}/movie/${id}?language=en-US`;
    const response = await fetch(movieDetails, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setMovieData(data);
  };

  const getMovieTrailer = async () => {
    const trailerUrl = `${BASE_URL}/movie/${id}/videos?language=en-US`;
    const response = await fetch(trailerUrl, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    // Find the official trailer (YouTube)
    const trailer =
      data.results?.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      ) || data.results?.[0]; // Fallback to first video if no trailer found

    setMovieTrailer(trailer || {});
  };

  const getMoreLike = async () => {
    const moreLike = `${BASE_URL}/movie/${id}/similar?language=en-US&page=1`;
    const response = await fetch(moreLike, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setMore(data.results || []);
  };
  const handleWatchTrailerButton = (id) => {
    setSelectedMovieDetailId(id);
  };

  console.log(movieTrailer, "movieTrailermovieTrailermovieTrailer");

  useEffect(() => {
    if (!id || isNaN(id)) return;
    getMovieData();
    getPeopleData();
    getMovieTrailer();
    getMoreLike();
  }, [id]);

  const handleMoreButton = () => {
  router.push(`/movies/similar/${id}`);
};

  return (
    <div className="flex flex-col items-center gap-[52px]">
      <Header />

      <div className="w-[1080px] flex flex-col gap-[32px]">
        {/* TITLE */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[36px] font-extrabold line-height:[40px]">
              {" "}
              {movieDetail?.title}
            </p>
            <p className="text-[18px] font-normal leading-7 ">
              {movieDetail?.release_date} · PG ·
              {movieDetail?.runtime != null && (
                <>
                  {Math.floor(movieDetail.runtime / 60)}h
                  {movieDetail.runtime % 60}m
                </>
              )}
            </p>
          </div>

          <div className="flex flex-col items-start">
            <p className="font-medium text-gray-600 text-[12px] mb-1">Rating</p>
            <div className="flex items-center gap-1">
              <StarIcon2 />
              <div className="flex-col">
                <div className="flex items-center">
                  <span className="font-semibold text-[18px]">
                    {movieDetail?.vote_average?.toFixed(1)}
                  </span>
                  <span className="text-[#71717A] text-[16px]">/10</span>
                </div>
                <span className="text-[#71717A] text-[12px]">
                  {" "}
                  {movieDetail?.vote_count &&
                    `${Math.round(movieDetail.vote_count / 1000)}k`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* IMAGES */}
        <div className="flex gap-8">
          <img
            className="w-[290px] h-[428px] rounded-sm object-cover"
            src={`https://image.tmdb.org/t/p/original${movieDetail?.poster_path}`}
            alt={movieDetail?.title}
          />
          <div className="relative">
            <img
              className="w-[760px] h-[428px] rounded-sm object-cover "
              src={`https://image.tmdb.org/t/p/original${movieDetail?.backdrop_path}`}
              alt={movieDetail?.title}
            />
            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <button
                    style={{ cursor: "pointer" }}
                    className="absolute left-6 bottom-6 flex items-center gap-3  text-white"
                  >
                    <div className="flex items-center rounded-full bg-white h-10 w-10 px-3 py-3 text-black">
                      ▶
                    </div>
                    Play trailer 2:35
                  </button>
                </DialogTrigger>
                <DialogContent className="h-[562px] w-[997px] p-0 flex justify-center items-center object-cover bg-[#F4F4F5]">
                  <DialogTitle className="display: hidden">
                    
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
        </div>
        <div className="flex flex-col gap-5 max-w-[1080px]">
          {/* Genres */}
          <section className="flex flex-wrap gap-3">
            {movieDetail?.genres?.map((g, index) => (
              <span
                key={index}
                className="py-0.5 px-2.5 border border-[#E4E4E7] rounded-full text-sm font-medium "
              >
                {g.name}
              </span>
            ))}
          </section>

          {/* Overview */}
          <section className="text-[16px] leading-relaxed ">
            {movieDetail?.overview}
          </section>
        </div>

        {/* Director / Writers / Stars */}
        <section className="space-y-1 text-[16px] leading-7 border-t border-gray-200 pt-4">
          <p>
            <span className="font-semibold">Director</span>{" "}
            {directorNames}
          </p>
          <p>
            <span className="font-semibold">Writers</span>{" "}
            {writerNames}
          </p>
          <p>
            <span className="font-semibold">Stars</span>{" "}
            {starNames}
          </p>
        </section>

        {/* More like this */}
        <section className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[22px] font-semibold ">
              More like this
            </h2>
            <button
              onClick={handleMoreButton}
              className="text-[14px] "
            >
              See more →
            </button>
          </div>

          <div className="flex flex-row gap-6 overflow-x-auto pb-2">
            {moreLike.slice(0, 5).map((movie) => (
              <MovieCard
                key={movie.id}
                movieId={movie.id}
                title={movie.title}
                rating={movie.vote_average}
                imageURL={movie.poster_path}
                size="medium"
              />
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
