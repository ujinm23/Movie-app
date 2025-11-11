"use client";

import { useEffect, useRef, useState } from "react";
import { BASE_URL, ACCESS_TOKEN } from "@/constants";

export function SearchResults({ query, isOpen, onClose }) {
  const [moviesData, setMoviesData] = useState([]);
  const ref = useRef(null);
  const endpoint = `${BASE_URL}/search/movie?query=${query}&language=en-US&page=1`;

  const fetchMovies = async () => {
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("data", data);
    setMoviesData(data.results);
  };

  useEffect(() => {
    fetchMovies();
  }, [query]);
  console.log("moviesData", moviesData);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !query) return null;

  return (
    <div
      ref={ref}
      className="absolute top-full left-0 right-0 mt-2 bg-background border-2 border-blue-500 rounded-lg"
    >
      <div className="p-4">
        <div className="space-y-4">
          {moviesData.data.map((result, index) => (
            <div
              key={index}
              className="flex items-center gap-4 pb-4 border-b border-border last:border-b-0 cursor-pointer"
            >
              <div className="relative w-16 h-24 rounded overflow-hidden shrink-0"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
