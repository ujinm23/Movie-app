"use client";

import { useParams} from "next/navigation";
import {useEffect, useState} from "react";  

const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";


export default function MoviesType() {
    const param = useParams();

    const [popularData, setPopularData] = useState ([]);
    const [loading, setLoading] = useState (false);

    const [page, setPage] = useState (1);

    const getPopularData = async () => {    
        const popularMovieEndpoint = `${BASE_URL}/movie/${param.type}?language=en-US&page=1`;
        const response = await fetch (popularMovieEndpoint, {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
                "Content-Type": "application/json",
            },
        });

        const data = await response.json ();    

    console.log(data);
    };
    useEffect(() => {
        getPopularData();
     
    }, []);

    const handleChangePage = () => {
        setPage(5);
    };

    return (
        <div>
            
            <button onClick={handleChangePage}>2</button>
        </div>
    );
}
