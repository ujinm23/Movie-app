"use client";

import { useRouter } from "next/navigation";
import { StarIcon } from "../_icons/StarIcon";
import { FilmIcon } from "../_icons/FilmIcon";
import { ChevronDown } from "../_icons/ChevronDown";
import { SearchIcon } from "../_icons/SearchIcon";
import { DarkModeIcon } from "../_icons/DarkModeIcon";
import { Seperator } from "../_icons/Seperator";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export function Header() {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/");
  };

  const getGenreData = async () => {
    const genreEndpoint = `${BASE_URL}/genre/movie/list?language=en`;
    const response = await fetch(genreEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    allResults.push(...data.results);
  };

  return (
    <header className="w-[1440px] h-[59px] flex items-center justify-between px-[80px]">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={handleLogoClick}
      >
        <FilmIcon />
        <p className="text-[#4338CA] text-[16px] italic font-bold">Movie Z</p>
      </div>
      <div className="w-[488px] h-[36px] flex gap-[12px] ">
        <div className="w-[97px] h-[36px] border-1 border-[#E4E4E7] gap-[8px] radius/rounded-md inter px-[16px] font-medium text-[14px] flex justify-center items-center cursor-pointer">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <NavigationMenuTrigger />
                  Genre
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {" "}
                    <div className="w-[577px] h-[333px] border border-[#E4E4E7] rounded p-[20px]">
                      <div className="h-[60px]">
                        <h3 className="font-semibold text-[24px]">Genre</h3>
                        <p>See lists of movies by genre</p>
                      </div>
                      <div className="h-[33px]">
                        <Seperator />
                      </div>
                      <div></div>
                    </div>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="w-[379px] h-[36px] border-1 border-[#E4E4E7] text-[#71717A] px-[12px] items-center gap-[10px] flex rounded">
          <SearchIcon className="opacity-50" /> Search..
        </div>
      </div>
      <div className="w-[36px] h-[36px] flex justify-center items-center rounded-[10px] border-1 border-[#E4E4E7]">
        <DarkModeIcon />
      </div>
    </header>
  );
}
