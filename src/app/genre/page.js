"use client";

import { useParams } from "next/navigation";
import { MovieList } from "@/app/_features/home/MovieList";
import { Header } from "@/app/_features/Header";
import { Footer } from "@/app/_features/Footer";
import { Seperator } from "../_icons/Seperator";
import { ChevronRight } from "../_icons/ChevronRight";


const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";


function Badge({ title }) {
  return (
    <div className="border rounded px-3 py-1 flex items-center gap-2">
      <p className="text-sm font-medium">{title}</p>
      <ChevronRight />
    </div>
  );
}

export default function Genre() {
  const getGenreData = async () => {
    const genreEndpoint =  `${BASE_URL}//genre/movie/list?language=en`;
    const response = await fetch(genreEndpoint, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      allResults.push(...data.results);
    }

    getGenreData(allResults);
    setLoading(false);
  };
  return (
    <div>
      {/* <Header />
      <div className="w-[577px] h-[333px] border border-[#E4E4E7] rounded p-[20px]">
        <div className="h-[60px]">
          <h3 className="font-semibold text-[24px]">Genre</h3>
          <p>See lists of movies by genre</p>
        </div>

        <div className="h-[33px]">
          <Seperator />
        </div>

        <div className="h-fit flex flex-wrap gap-2">
            {genreData.map((movie) => (
                        <Badge
                          genre={movie.genre}
                          
                        />
                      ))}
          <Badge title="Action" />
          <Badge title="Action" />
          <Badge title="Comedy" />
          <Badge title="Horror" />
        </div>
      </div>
      <Footer /> */}
    </div>
  );


