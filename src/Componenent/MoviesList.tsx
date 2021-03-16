import React, { useEffect, useState } from 'react';
import '../styles/MoviesList.css';

interface MovieNode {
    original_title: string;
    id: number;
    backdrop_path: string;
    poster_path: string;
}

const serverUri = "http://image.tmdb.org/t/p/original//";
const MoviesList: React.FC = () => {
const [movies, setMovies] = useState<MovieNode[]>([]);

useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=b733f9f3727f7a148f45111ceb4cff9a&language=en-US&page=1")
    .then(response => response.json())
        .then(data => setMovies(data.results));
  }, [])

    return <div className="movies-card-list">
        {movies.length > 0 && movies.map((movie: MovieNode) => {
            return <div key={movie.id} className="movie-card">
                <img className="movie-card-poster" src={serverUri + movie.poster_path } alt=""/>
                </div>
        })}
    </div>
}

export default MoviesList;