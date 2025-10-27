import { StarIcon } from "../_icons/StarIcon";
import { FilmIcon } from "../_icons/FilmIcon";
import { ChevronDown } from "../_icons/ChevronDown";
import { SearchIcon } from "../_icons/SearchIcon";
import { DarkModeIcon } from "../_icons/DarkModeIcon";

export function Header() {
  return (
    <header className="w-[1440px] h-[59px] flex items-center justify-between px-[80px]">
      <div className="flex items-center gap-2 ml-6">
        <FilmIcon />
        <p className="text-[#4338CA] text-[16px] italic font-bold">Movie Z</p>
      </div>
      <div className="w-[488px] h-[36px] flex gap-[12px]">
        <div className="w-[97px] h-[36px] border-1 border-[#E4E4E7] rounded inter font-medium text-[14px] flex items-center">
            <ChevronDown /> Genre
        </div>
       <div className="w-[379px] h-[36px] border-1 border-[#E4E4E7] text-[#71717A] items-center gap-[10px] flex rounded">
        <SearchIcon /> Search..
       </div>
      </div>
      <div className="w-[36px] h-[36px] flex justify-center items-center rounded-[10px] border-1 border-[#E4E4E7]">
        <DarkModeIcon/>
        </div>      
    </header>
  );
}
