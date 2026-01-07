"use client";
import { ArrowRight } from "../_icons/ArrowRight";
import { StarIcon } from "../_icons/StarIcon";
import { useRouter } from "next/navigation";
import { ACCESS_TOKEN, BASE_URL } from "@/constants";

export function MovieCard({
  movieId,
  title,
  imageURL,
  rating,
  size = "large",
}) {
  const router = useRouter();

  const handleMoreButton = (id) => {
    router.push(`/movieDetail/${id}`);
  };

  // Define sizes for card dimensions
  const sizes = {
    small: {
      card: "w-[165px] h-[331px]",
      image: "w-[165px] h-[244px]",
      content: "h-[87px]",
    },
    medium: {
      card: "w-[190px] h-[372px]",
      image: "w-[190px] h-[281px]",
      content: "h-[87px]",
    },
    large: {
      card: "w-[229.73px] h-[439px]",
      image: "w-[229.73px] h-[340px]",
      content: "h-[95px]",
    },
  };

  const currentSize = sizes[size];

  return (
    <div
      onClick={() => handleMoreButton(movieId)}
      className={`${currentSize.card} bg-[#F4F4F5] dark:bg-[#27272A] rounded-lg flex flex-col justify-between `}
    >
      <div
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original${imageURL}')`,
        }}
        className={`${currentSize.image} bg-center bg-cover rounded-t-lg`}
      ></div>
      <div className={`${currentSize.content} p-[8px]`}>
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-[4px]">
            <StarIcon className="w-[16px] h-[18px] object-contain text-[#FDE047] dark:text-[#FAFAFA]" />
            <div className="flex items-center">
              <p className="font-medium text-[14px]">
                {Number(rating).toFixed(1)}
              </p>
              <p className="text-[#71717A] dark:text-gray-400 text-[12px]">
                /10
              </p>
            </div>
          </div>
          <p>{title}</p>
        </div>
      </div>
    </div>
  );
}
