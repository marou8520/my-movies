import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchMovies, selectMovies, selectstatus
  } from '../redux/moviesSlice';
import '../styles/MoviesList.css';

interface MovieNode {
    original_title: string;
    id: number;
    backdrop_path: string;
    poster_path: string;
}

const serverUri = "http://image.tmdb.org/t/p/original//";
const MoviesList: React.FC = () => {
const dispatch = useDispatch();
const movies = useSelector(selectMovies);
const postStatus = useSelector(selectstatus)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchMovies())
    }
  }, [postStatus, dispatch])
 
    return <div className="movies-card-list">
        {movies.length > 0 && movies.map((movie: MovieNode) => {
            return <div key={movie.id} className="movie-card">
                <img className="movie-card-poster" src={serverUri + movie.poster_path } alt=""/>
                </div>
        })}
    </div>
}

export default MoviesList;