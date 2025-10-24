"use client";

import { StarIcon } from "../../_icons/StarIcon";
import { LoadingMovieList } from "./LoadingMovieList";
import { useEffect, useState } from "react";
import { MovieCard } from "../../_components/MovieCard";
import {ArrowRight} from "../../_icons/ArrowRight";

const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

 export const MovieList = (props) => {

const { type } = props;

const router = useRouter();

const [popularData, setPopularData] = useState([]);
const getPopularData = async () => {
    const popularMovieEndpoint = `${BASE_URL}/movie/$(type)?language=en-US&page=1`;
    const response = await fetch (popularMovieEndpoint, {
    headers: {
    Authorization: `Bearer $(ACCESS_TOKEN)`,
    "Content-Type": "application/json",
    },
    });
const data = await response.json ();

setPopularData (data. results);
};

useEffect(() => {
    getPopularData();
}, []);

const handleSeeMoreButton = () => {
    router.push(`/movies/$(type)`);
};
    return (
        ""
    )
 };