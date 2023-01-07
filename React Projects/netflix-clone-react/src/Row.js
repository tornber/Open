import React,{useState,useEffect} from 'react';
import axios from './axios';
import './Row.css'
import Youtube from 'react-youtube'
import MovieTrailer from 'movie-trailer'

const base_url = "https://image.tmdb.org/t/p/original"

const Row = ({ title,fetchUrl,isLargeRow}) => {
    
    const [movies,setMovies] = useState([]);
    const [trailerUrl,setTrailerUrl] = useState("");
    const [prevId,setPrevId] = useState('');

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData()
    },[fetchUrl])
    
    const opts = {
      width: "100%",
      height: "390",
      playerVars: {
        autoplay: 1
      }
    }

    const handleClick = (movie) => {
      
      if(trailerUrl && prevId === movie.id) {
        setTrailerUrl('')
      } else {
        MovieTrailer(movie.name || "")
        .then(url => {
          const videoId = new URLSearchParams(new URL(url).search)
          setTrailerUrl(videoId.get('v'))
          setPrevId(movie.id);
        })
        .catch(error => console.log(error))
      }
  }

  return (
    <div className='row'>
      <h2 className='row__title'>{title}</h2>

      <div className='row__posters'>
            {movies.map(movie => (
              <img
                onClick={() => handleClick(movie)}
                key={movie.id}
                className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                src={`${base_url}${isLargeRow ?
                  movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
              ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  )
}

export default Row