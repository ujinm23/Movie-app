"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MovieList } from "@/app/_features/home/MovieList";
import { Header } from "@/app/_features/Header";
import { Footer } from "@/app/_features/Footer";
import { ACCESS_TOKEN, BASE_URL } from "@/constants";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function MoviesType() {
  const param = useParams();

  const [popularData, setPopularData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  const getPopularData = async () => {
    const popularMovieEndpoint = `${BASE_URL}/movie/${param.type}?language=en-US&page=1`;
    const response = await fetch(popularMovieEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);
  };
  useEffect(() => {
    getPopularData();
  }, []);

  const handleChangePage = () => {
    setPage(5);
  };

  return (
    <div className="flex items-center gap-[24px] flex-col">
      <Header />
      <MovieList type={param.type} seeMore={false} />
      <div className="w-[1220px]">
        <Pagination className="flex justify-end px-[15px]">
          <PaginationContent className="w-[426px] justify-between flex">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => {
                  if (page > 1) setPage(page - 1);
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={page === 1}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(1);
                }}
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={page === 2}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(2);
                }}
              >
                2
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={page === 5}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(5);
                }}
              >
                5
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <Footer />
    </div>
  );
}
