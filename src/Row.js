import React, { useEffect, useState } from "react";
import "./Row.css";
import axios from "./axios";
import YouTube from 'react-youtube'
import movieTrailer from "movie-trailer"


const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl,setTrailerUrl]=useState("")

  useEffect(() => {
    async function fetchdata() {
      const request = await axios.get(fetchUrl);
      console.log(request)
      setMovies(request.data.results);
      return request;
    }
    fetchdata();
  }, [fetchUrl]);


  const opts = {
    hight: '390',
    width: "100%",
    playervars: {
      outoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie.orginal_name)
      .then((url)=> {
        const urlparams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlparams.get("v"));
        
      })
        .catch((error) => console.log(error));
    }
  };

  console.log(movies);

  return (
    <div className="row">
      <h1>{title}</h1>
      <div className="row__Posters">
        {movies.map((movie) => (
          <img
            onClick={()=>handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      <div style={{padding:"40px" }}>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        
       </div>



    </div>
  );
}

export default Row;





// import React, { useEffect, useState } from 'react'
// import './Row.css'
// import axios from './axios'
// function Row({ title, fetchUrl }) {
//     const [movies, setMovies] = useState([]);

// useEffect(() => {
//   async function fetchdata() {
//     const request = await axios.get(fetchUrl);

//     console.log(request)
//     setMovies(request.data.results);
//     return request;
//   }
//   fetchdata();
// }, [fetchUrl]);

// console.log(movies);


//   return (
//       <div>
//           <h1>{ title}</h1>
//     </div>
//   )
// }

// export default Row






// ye Abdu

// import React, { useEffect, useState } from "react";
// import "./Row.css";
// import axios from "./axios";

// const base_url = "https://image.tmdb.org/t/p/original/";

// function Row({ title, fetchUrl, isLargeRow }) {
//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     async function fetchdata() {
//       const request = await axios.get(fetchUrl);
//       console.log(request)
//       setMovies(request.data.results);
//       return request;
//     }
//     fetchdata();
//   }, [fetchUrl]);

//   console.log(movies);

//   return (
//     <div className="Row">
//       <h1>{title}</h1>
//       <div className="Row__Posters">
//         {movies.map((movie) => (
//           <img
//             className={`row__poster ${isLargeRow && "row__posterLarge"}`}
//             src={`${base_url}${
//               isLargeRow ? movie.poster_path : movie.backdrop_path
//             }`}
//             alt={movie.name}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Row;
