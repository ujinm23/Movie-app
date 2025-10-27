`use client`;

import { useParams, useSearchParams } from "next/navigation";
import {useState, useEffect} from "react";  

export default function MoviesType() {
    const param = useParams();

    const [popularData, setPopularData] = useState ([]);
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
        getUpcomingData();
        getTopRatedData();
    }, []);

    return (
        <div>
            hello from popular
        </div>
    );
}
