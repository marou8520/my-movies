import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getMovieDetail,
  selectstatus,
  selectMovie,
  resetMovieDetail,
} from "../redux/movieDetailSlice";
import { selectTheme } from "../redux/themeSlice";

import { useLocation } from "react-router-dom";
import "../styles/MovieDetail.css";

interface LocationState {
  movieId: number;
}

const serverUri = "http://image.tmdb.org/t/p/original//";

const MovieDetail: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation<LocationState>();
  const movie = useSelector(selectMovie);
  const postStatus = useSelector(selectstatus);
  const lightTheme = useSelector(selectTheme);

  const { movieId } = location.state;
  useEffect(() => {
    return () => {
      dispatch(resetMovieDetail());
    };
  }, [dispatch]);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(getMovieDetail(movieId));
    }
  }, [postStatus, dispatch, movieId]);

  if (movie) {
    return (
      <div
        className={`movie-detail-container ${
          lightTheme ? "" : "dark-theme-text"
        }`}
      >
        <div className="movie-info-container">
          <div className="movie-title">{movie.title}</div>
          <div>{movie.overview}</div>
          <div className="movie-score">{movie.vote_average}/10</div>
        </div>
        <img
          className="movie-poster"
          src={serverUri + movie.poster_path}
          alt=""
        />
      </div>
    );
  } else {
    return null;
  }
};

export default MovieDetail;
