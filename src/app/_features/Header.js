"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FilmIcon } from "../_icons/FilmIcon";
import { ChevronDown } from "../_icons/ChevronDown";
import { SearchIcon } from "../_icons/SearchIcon";
import { DarkModeIcon } from "../_icons/DarkModeIcon";
import { Seperator } from "../_icons/Seperator";
import { ChevronRight } from "../_icons/ChevronRight";
import { ChevronRight2 } from "../_icons/ChevronRight2";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export function Header() {
  const router = useRouter();
  const [genres, setGenres] = useState([]);

  const handleLogoClick = () => {
    router.push("/");
  };

  // Fetch genres from TMDB API
  useEffect(() => {
    const getGenreData = async () => {
      try {
        const genreEndpoint = `${BASE_URL}/genre/movie/list?language=en`;
        const response = await fetch(genreEndpoint, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setGenres(data.genres || []);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    getGenreData();
  }, []);

  return (
    <header className="w-[1440px] h-[59px] flex items-center justify-between px-[80px]">
      <div
        className="flex items-center cursor-pointer gap-[8px]"
        onClick={handleLogoClick}
      >
        <FilmIcon />
        <p className="text-[#4338CA] text-[16px] italic font-bold">Movie Z</p>
      </div>
      <div className="w-[488px] h-[36px] flex gap-[12px] ">
        {" "}
        <div className="w-[97px] h-[36px] border-1 border-[#E4E4E7]  gap-[8px] rounded inter font-medium text-[14px] flex justify-center items-center cursor-pointer">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex items-center justify-center gap-[8px] font-medium text-[14px]">
                  <ChevronDown />
                  <p>Genre</p>
                </NavigationMenuTrigger>

                <NavigationMenuContent className="p-[20px] border border-[#E4E4E7] rounded h-[333px] max-w-[577px] bg-white">
                  <div className="h-[36px]">
                    <h3 className="font-semibold text-[24px]">Genre</h3>
                    <p>See lists of movies by genre</p>
                  </div>

                  <div className="h-[33px] my-[10px]">
                    <Seperator />
                  </div>

                  <div className="flex flex-wrap gap-[16px] mt-[10px]">
                    {genres.length > 0 ? (
                      genres.map((genre) => (
                        <div
                          key={genre.id}
                          onClick={() =>
                            router.push(`/movies/genre/${genre.id}`)
                          }
                          className="flex items-center border border-[#E4E4E7] rounded-full gap-[11px] px-[10px] cursor-pointer hover:bg-[#F4F4F5] transition w-fit"
                        >
                          <p className="text-[12px] inter font-semibold text-[#09090B]  mr-1">
                            {genre.name}
                          </p>
                          <ChevronRight2 />
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400">Loading...</p>
                    )}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="w-[379px] h-[36px] border border-[#E4E4E7] text-[#71717A] px-[12px] flex items-center gap-[10px] rounded">
          <SearchIcon className="opacity-50" /> Search..
        </div>
      </div>

      <div className="w-[36px] h-[36px] flex justify-center items-center rounded-[10px] border border-[#E4E4E7]">
        <DarkModeIcon />
      </div>
    </header>
  );
}
